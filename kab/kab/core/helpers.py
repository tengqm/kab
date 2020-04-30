import collections
import copy
import importlib
import json
import logging
import os
from os import path
import subprocess

from django.apps import apps
from django.contrib import messages
from django.forms import models

from kab import consts

LOG = logging.getLogger(__name__)


def _load_json(fn):
    try:
        with open(fn, "r") as f:
            return json.load(f)
    except Exception as ex:
        LOG.error("failed to load JSON %s: %s", fn, str(ex))
        return {}


DATA = _load_json("data/settings.json")
DATA.update(_load_json("data/index.json"))


# Configuration Loaders

def _emptyNumeric(v):
    def_val = v.get('default', None)
    enum_vals = v.get("enum", [])
    if def_val is not None:
        return def_val
    if len(enum_vals) > 0:
        return enum_vals[0]
    return 0


def _emptyString(v):
    def_val = v.get('default', None)
    enum_vals = v.get("enum", [])
    if def_val is not None:
        return def_val
    if len(enum_vals) > 0:
        return enum_vals[0]
    return ""


def _emptyObject(obj, required_only=True):
    properties = obj.get('properties', {})
    required = obj.get('required', [])
    result = {}
    for k, v in properties.items():
        if required_only and k not in required:
            continue
        ele_type = v.get('type')
        if ele_type == 'array':
            data = _emptyArray(v, required_only)
        elif ele_type == 'object':
            data = _emptyObject(v, required_only)
        elif ele_type == "string":
            data = _emptyString(v)
        elif ele_type in ["integer", "number"]:
            data = _emptyNumeric(v)
        elif ele_type == "boolean":
            data = v.get("default", False)
        else:
            data = None
        result[k] = data
    return result


def _emptyArray(array, required_only=True):
    items = array.get('items', {})
    ele_type = items.get('type', None)
    if ele_type is None:
        return []
    if ele_type == "object":
        data = _emptyObject(items, required_only)
    elif ele_type == "string":
        data = _emptyString(items)
    elif ele_type in ["number", "integer"]:
        data = _emptyNumeric(items)
    elif ele_type == "boolean":
        data = items.get("default", False)
    else:
        data = None
    return [data]


def empty_json(schema, required_only=True):
    """Generate empty JSON from schema"""
    ele = schema.get('type')
    if ele == 'object':
        data = _emptyObject(schema, required_only)
    elif ele == "array":
        data = _emptyArray(schema, required_only)
    else:
        return {}
    return data


class NullStream:
    def __init__(self):
        self.buf = ""

    def write(self, s):
        self.buf += s.decode('utf-8')

    def flush(self):
        pass


def _validateArray(schema):
    items = schema.get('items', {})
    if not isinstance(items, dict):
        return ("the definition must be a dict, please remove the '[' and ']' "
                "characteres and try again")
    ele_type = items.get('type', None)
    if ele_type is None:
        return None
    if ele_type == "object":
        return _validateObject(items)
    if ele_type == "array":
        return _validateArray(items)
    return None


def _validateObject(schema):
    properties = schema.get('properties', {})

    res = None
    for name, value in properties.items():
        ele_type = value.get('type')
        if ele_type == 'array':
            res = _validateArray(value)
        elif ele_type == 'object':
            res = _validateObject(value)
        if res is not None:
            return "'%s' - %s" % (name, res)

    return res


def check_schema(schema):
    """Stricter validator for schema."""
    res = None
    ele = schema.get('type')
    if ele == 'object':
        res = _validateObject(schema)
    elif ele == "array":
        res = _validateArray(schema)
    return res


def xlat_errors(req, form, used=True):

    for field, error in form.errors.get_json_data().items():
        location = ""
        if field != "__all__":
            location = field + ": "
        msg = location + error[0]['message']
        messages.add_message(req, messages.ERROR, msg)
    errors = messages.get_messages(req)
    if used:
        errors.used = True
    return errors


def apis():
    return DATA.get("api_versions", [])


def latest_api():
    return DATA["api_versions"][-1]


def groups(api_version):
    result = []
    group_data = DATA.get("group_names", [])
    for k, v in DATA.get("groups", {}).items():
        if api_version not in v:
            continue
        for r in group_data:
            if r["name"] == k:
                result.append(r)
    return sorted(result, key=lambda g: g["name"])


def group_path(group_name):
    for g in DATA.get("group_names", []):
        if g["name"] == group_name:
            return g["path"]
    return group_name


def group_versions(api_version, group):
    data = DATA.get("groups", {}).get(group, {}).get(api_version, [])
    return sorted(data)


def definitions(apiv, group="all", version="all", kind="all"):
    """List definitions in an API version."""
    result = []
    for k, v in DATA["definitions"].items():
        if kind != "all" and kind != k:
            continue

        if apiv not in v:
            continue

        for item in v.get(apiv, []):
            if group != "all" and group != item["group"]:
                continue
            if version != "all" and version != item["version"]:
                continue

            parts = k.rsplit(".", 2)
            if parts[-1] in ["CREATE", "UPDATE", "GET", "PATCH"]:
                display = parts[-2] + " (" + parts[-1].lower() + ")"
            else:
                display = k

            result.append({
                "group": item["group"],
                "version": item["version"],
                "name": k,
                "display": display
            })

    return sorted(result, key=lambda r: r["display"])


def definition_versions(defn):
    data = {}
    for k, v in DATA["definitions"].get(defn, {}).items():
        if k != "appearsIn":
            data[k] = v
    return data


def definition_appears_in(apiv, defn):
    data = []
    dentry = DATA["definitions"].get(defn, {})
    for item in dentry.get("appearsIn", {}).get(apiv, []):
        def_name, display_name, _ = definition_display_name(item)
        item_groups = DATA["definitions"].get(item, {}).get(apiv, [])
        data.append({
            "name": def_name,
            "display": display_name,
            "group_name": item_groups[0]["group"],
            "group_version": item_groups[0]["version"],
        })
    return sorted(data, key=lambda r: r["name"])


def get_definition(api_version, group, version, defn):
    # def_name is too short, need full path
    gpath = group_path(group)
    fn = gpath + "." + version + "." + defn
    LOG.info("Reading %s", fn)
    fpath = path.join("data", api_version, "defs", fn+ ".json")
    return _load_json(fpath)


def resources(api_version, group_version):
    groups = []
    # Get sorted groups
    for gname, gdata in DATA.get("groups", {}).items():
        for v in gdata.get(api_version, []):
            curr_gv = ".".join([gname, v])
            if group_version == "all" or group_version == curr_gv:
                groups.append((curr_gv, []))
    groups = sorted(groups)
    result = collections.OrderedDict(groups)
    for r in DATA.get("resources", []):
        if api_version not in r["versions"]:
            continue
        gname = r["group"]
        record = {
            "name": r["name"],
            "definitions": r["definitions"],
        }
        for v in r["versions"].get(api_version, []):
            curr_gv = ".".join([gname, v])
            if group_version != "all" and group_version != curr_gv:
                continue
            result[curr_gv].append(record)

    return result 


def resource_operations(resource, group_version):
    data = {}
    for res in DATA["resources"]:
        if res["name"] == resource:
            data = res.get("operations", {}).get(group_version, {})
    return collections.OrderedDict(sorted(data.items()))


def operations(api_version, group_version):
    data = []
    for op in DATA.get("operations", []):
        # filter version
        if op["version"] != api_version:
            continue
        # filter group_version
        if group_version != "all" and group_version != op["group_version"]:
            continue
        data.append({
            "type": op["type"],
            "op_type": op["op_type"],
            "group_version": op["group_version"],
            "description": op["description"],
            "target": op["target"],
            "name": op["name"]})
    
    return sorted(data, key=lambda x: x["name"])


def get_operation(api_version, name):
    data = {}
    for op in DATA.get("operations", []):
        if op["version"] == api_version and op["name"] == name:
            data = op
            break
    if not data:
        return {}
    path = "data/{}/ops/{}.json".format(api_version, name)
    opdata = _load_json(path)
    opdata["_meta"] = data
    return opdata


def parameters(api_version):
    return DATA.get(api_version, {}).get("parameters", {})


def _load_parameters(version):
    global DATA

    basedir = "data/" + version
    fn = os.path.join(basedir, "parameters", "parameters.json")
    try:
        with open(fn, "r") as f:
            raw = f.read()
            data = json.loads(raw)
    except Exception:
        data = {}
    DATA[version]["parameters"] = data
    return


def definition_display_name(def_name):
    """Get definition name properly"""

    if (def_name.endswith(".CREATE") or def_name.endswith(".UPDATE") or
            def_name.endswith(".GET") or def_name.endswith(".PATCH")):
        parts = def_name.rsplit(".", 2)
        variant = parts[-1].lower() 
        display_name = parts[-2] + " (" + parts[-1].lower() + ")"
        def_name = parts[-2] + "." + parts[-1]
    else:
        parts = def_name.rsplit(".", 1)
        display_name = parts[-1]
        def_name = parts[-1]
        variant = ""

    return def_name, display_name, variant


# parse the name of a definition, returns its group, version and kind
def parse_definition_id(def_id):

    if (def_id.endswith(".CREATE") or def_id.endswith(".UPDATE") or
            def_id.endswith(".GET") or def_id.endswith(".PATCH")):
        parts = def_id.rsplit(".", 3)
        variant = parts[-1].lower() 
        display_name = parts[-2] + " (" + parts[-1].lower() + ")"
        def_name = parts[-2] + "." + parts[-1]
        version = parts[-3]
        group_path = parts[0]
    else:
        parts = def_id.rsplit(".", 2)
        display_name = parts[-1]
        def_name = parts[-1]
        version = parts[-2]
        group_path = parts[0]
        variant = ""

    # translate to short group name
    group = group_path
    for g in DATA.get("group_names", []):
        if g["path"] == group_path:
            group = g["name"]

    return group, version, def_name, display_name


def parse_params(api_version, op):
    params = []
    for p in op.get("parameters", []):
        target = p.get("$ref", "")
        if not target:
            params.append(p)
            continue
        if not "#/parameters/" in target:
            params.append(p)
            continue
        param = target[13:]
        LOG.info(param)
        param_def = DATA["parameters"].get(param, {}).get(api_version, {})
        if param_def:
            params.append(param_def)
    op["parameters"] = params
    return op


def is_resource(def_name):
    return def_name in DATA["kinds"]
