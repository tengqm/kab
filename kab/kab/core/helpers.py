# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import collections
import copy
import difflib
import logging
from os import path

from django.conf import settings
from django.utils import translation
import markdown

from kab import consts
from kab.core import jsonutil

LOG = logging.getLogger(__name__)
DATA = None
DATA_PATH = ""


def init(data_path):
    '''
    Configuration Loader
    '''
    global DATA
    global DATA_PATH

    DATA_PATH = data_path
    DATA = jsonutil.load_json(path.join(data_path, "settings.json"))
    DATA.update(jsonutil.load_json(path.join(data_path, "index.json")))


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


def apis():
    return [item[0] for item in consts.API_VERSIONS]


def latest_api():
    return consts.API_VERSIONS[-1][0]


def api_summary(apiv):
    """Summarize API by api_groups, resources, operations."""

    group_count = 0
    group_data = DATA["group_names"]
    for k, v in DATA["groups"].items():
        if apiv not in v:
            continue
        for r in group_data:
            if r["name"] == k:
                group_count += len(v.get(apiv, []))

    def_count = 0
    for k, v in DATA["definitions"].items():
        if apiv not in v:
            continue
        def_count += len(v.get(apiv, []))

    res_count = 0
    for r in DATA["resources"]:
        vlist = r["versions"].get(apiv, [])
        res_count += len(vlist)

    op_count = 0
    for op, opdata in DATA["operations"].items():
        if apiv in opdata["versions"]:
            op_count += 1

    return {
        "groups": group_count,
        "definitions": def_count,
        "resources": res_count,
        "operations": op_count,
    }


def groups(api_version):
    result = []
    group_data = DATA.get("group_names", [])
    for group_name, v in DATA.get("groups", {}).items():
        if api_version not in v:
            continue
        g_data = {
            "versions": sorted(v[api_version])
        }
        for r in group_data:
            if r["name"] == group_name:
                g_data.update(r)
                result.append(g_data)
    return sorted(result, key=lambda g: g["name"])


def group_full_name(group):

    for g in DATA.get("group_names", []):
        if g["name"] == group:
            return g["display"]
    return group


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


def get_definition_name(group, version, defn):
    if defn == "Info":
        fn = "io.k8s.apimachinery.pkg.version.Info"
    elif defn == "IntOrString":
        fn = "io.k8s.apimachinery.pkg.util.intstr.IntOrString"
    elif defn == "RawExtension":
        fn = "io.k8s.apimachinery.pkg.runtime.RawExtension"
    elif defn == "Quantity":
        fn = "io.k8s.apimachinery.pkg.api.resource.Quantity"
    else:
        gpath = group_path(group)
        fn = gpath + "." + version + "." + defn
    return fn + ".json"


def get_definition(apiv, group, version, defn, recursive=False):
    # def_name is too short, need full path
    fn = get_definition_name(group, version, defn)
    fpath = path.join("data", apiv, "defs", fn)
    return jsonutil.load_json(fpath, apiv, recursive=recursive)


def resources(apiv, group_version):
    groups = []
    # Get sorted groups
    for gname, gdata in DATA.get("groups", {}).items():
        for v in gdata.get(apiv, []):
            curr_gv = ".".join([gname, v])
            if group_version == "all" or group_version == curr_gv:
                groups.append((curr_gv, []))
    groups = sorted(groups)
    result = collections.OrderedDict(groups)
    for r in DATA.get("resources", []):
        if apiv not in r["versions"]:
            continue
        gname = r["group"]
        record = {
            "name": r["name"],
            "definitions": r["definitions"],
        }
        for gver in r["versions"].get(apiv, []):
            curr_gv = ".".join([gname, gver])
            if group_version != "all" and group_version != curr_gv:
                continue
            result[curr_gv].append(record)

    return result


def resource_operations(resource, group_version):
    data = {}
    for res in DATA["resources"]:
        if res["name"] == resource:
            data = res.get("operations", {}).get(group_version, {})
            break
    return collections.OrderedDict(sorted(data.items()))


def operations(api_version, group_version):
    data = {}
    for opid, op in DATA["operations"].items():
        # filter version
        if api_version not in op["versions"]:
            continue
        # filter group_version
        if group_version != "all" and group_version != op["group_version"]:
            continue

        opdict = data.get(op["group_version"], {})
        op_type = op["type"]
        if op_type == "group":
            ops = opdict.get("group", [])
        else:
            ops = opdict.get(op["target"], [])

        if (translation.get_language() == 'zh' and
            'x-kab-description-zh' in op):
            op['description'] = op.get('x-kab-description-zh', '')

        ops.append({
            "op_type": op["op_type"],
            "description": op["description"],
            "target": op["target"],
            "name": opid})

        if op_type == "group":
            opdict["group"] = ops
        else:
            opdict[op["target"]] = ops

        opd = collections.OrderedDict(sorted(opdict.items()))
        data[op["group_version"]] = opd

    return collections.OrderedDict(sorted(data.items()))


def get_operation(api_version, name, root=None):
    op_data = DATA["operations"].get(name, {})

    if not op_data:
        LOG.error("Operation '%s' not found", name)
        return None

    data = copy.deepcopy(op_data)

    if root is None:
        root = settings.DATA_DIR
    path = "{}/{}/ops/{}.json".format(root, api_version, name)
    spec = jsonutil.load_json(path, api_version, recursive=False)
    # The operation file is not found
    if spec is None:
        return None
    data["spec"] = spec
    return data


def related_ops(name, resource, group_version):
    data = {}
    for res in DATA["resources"]:
        if res["name"] == resource:
            data = res.get("operations", {}).get(group_version, {})
            break

    k = None
    for op, opid in data.items():
        if opid == name:
            k = op
    if k is not None:
        data.pop(k)

    return collections.OrderedDict(sorted(data.items()))


def parameters(api_version):
    result = {}
    for k, v in DATA["parameters"].items():
        if api_version in v:
            result[k] = v.get(api_version)
    return collections.OrderedDict(sorted(result.items()))


def definition_display_name(def_name):
    """Get definition name properly"""

    if (def_name.endswith(".CREATE") or def_name.endswith(".UPDATE") or
            def_name.endswith(".GET") or def_name.endswith(".PATCH")):
        parts = def_name.rsplit(".", 2)
        variant = parts[-1].lower()
        display_name = parts[-2] + " (" + parts[-1].lower() + ")"
        def_name = parts[-2] + "." + parts[-1]
    elif (def_name.endswith(".INNERCREATE") or def_name.endswith(".INNERUPDATE") or
            def_name.endswith(".INNERGET")):
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


def parse_definition_id(def_id):
    '''
    Parse the name of a definition, returns its group, version and kind
    '''

    if (def_id.endswith(".CREATE") or def_id.endswith(".UPDATE") or
            def_id.endswith(".GET") or def_id.endswith(".PATCH")):
        parts = def_id.rsplit(".", 3)
        # variant = parts[-1].lower()
        display_name = parts[-2] + " (" + parts[-1].lower() + ")"
        def_name = parts[-2] + "." + parts[-1]
        version = parts[-3]
        group_path = parts[0]
    elif (def_id.endswith(".INNERCREATE") or def_id.endswith(".INNERUPDATE") or
            def_id.endswith(".INNERGET")):
        parts = def_id.rsplit(".", 3)
        # variant = parts[-1].lower()
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
        if "#/parameters/" not in target:
            params.append(p)
            continue
        param = target[13:]
        param_def = DATA["parameters"].get(param, {}).get(api_version, {})
        if param_def:
            if (translation.get_language() == 'zh' and
                    'x-kab-description-zh' in param_def):
                desc = param_def['x-kab-description-zh']
                param_def['description'] = desc
            params.append(param_def)

    return params


def is_resource(def_name):
    return def_name in DATA["kinds"]


def _markdown(text):
    t = markdown.markdown(text, extensions=["extra"])
    if t.startswith("<p>") and t.endswith("</p>"):
        t = t[3:-4]
    return t


def compare_text(text1, text2):
    """
    Compare two markdown texts and return the diff as annotated HTML.
    """
    d1 = _markdown(text1)
    d2 = _markdown(text2)

    sm = difflib.SequenceMatcher(lambda x: x == " ", d1, d2)

    output = []
    for opcode, a0, a1, b0, b1 in sm.get_opcodes():
        if opcode == 'equal':
            output.append(sm.a[a0:a1])
        elif opcode == 'insert':
            output.append("<ins>" + sm.b[b0:b1] + "</ins>")
        elif opcode == 'delete':
            output.append("<del>" + sm.a[a0:a1] + "</del>")
        elif opcode == 'replace':
            output.append("<ins>" + sm.b[b0:b1] + "</ins>" +
                          "<del>" + sm.a[a0:a1] + "</del>")
        else:
            LOG.error("Unknown opcode")

    res = ''.join(output)
    return res


def _VGT(v1, v2):
    p1 = v1.split(".")
    p2 = v2.split(".")
    if int(p1[0]) == int(p2[0]):
        return int(p1[1]) > int(p2[1])
    return int(p1[0]) > int(p2[0])


def _VGE(v1, v2):
    p1 = v1.split(".")
    p2 = v2.split(".")
    if int(p1[0]) == int(p2[0]):
        return int(p1[1]) > int(p2[1])
    return int(p1[0]) > int(p2[0])


def features(apiv, include_all=False):
    global DATA_PATH

    data = jsonutil.load_json(path.join(DATA_PATH, "features.json"))
    result = {}
    for fname, fdata in data["features"].items():
        # check Alpha
        alpha = fdata.get("Alpha", {})
        afrom = alpha.get("from", "0.0")
        if _VGT(afrom, apiv):
            continue

        # convert description
        if (translation.get_language() == 'zh' and 'x-kab-description-zh' in fdata):
            desc = fdata['x-kab-description-zh']
        else:
            desc = fdata['description']

        desc = _markdown(desc)
        ato = alpha.get("to", "0.0")
        if ato is None or _VGE(ato, apiv):
            result[fname] = {
                "default": alpha["default"],
                "stage": "Alpha",
                "since": afrom,
                "description": desc,
            }
            continue

        # check Beta
        beta = fdata.get("Beta", {})
        bfrom = beta.get("from", "0.0")
        if _VGT(bfrom, apiv):
            continue
        bto = beta.get("to", "0.0")
        if bto is None or _VGE(bto, apiv):
            result[fname] = {
                "default": beta["default"],
                "stage": "Beta",
                "since": bfrom,
                "description": desc,
            }
            continue

        # check Beta1
        beta1 = fdata.get("Beta1", {})
        bfrom1 = beta1.get("from", "0.0")
        if _VGT(bfrom1, apiv):
            continue
        bto1 = beta1.get("to", "0.0")
        if bto1 is None or _VGE(bto1, apiv):
            result[fname] = {
                "default": beta1["default"],
                "stage": "Beta",
                "since": bfrom,
                "description": desc,
            }
            continue

        if not include_all:
            continue

        # check GA
        ga = fdata.get("GA", {})
        gfrom = ga.get("from", "0.0")
        if _VGT(gfrom, apiv):
            continue
        if gfrom != 0.0:
            result[fname] = {
                "default": "-",
                "stage": "GA",
                "since": gfrom,
                "description": desc,
            }
            continue

        # check Deprecated
        deprecated = fdata.get("Deprecated", {})
        dfrom = deprecated.get("from", "0.0")
        if _VGT(dfrom, apiv):
            continue
        if dfrom != 0.0:
            result[fname] = {
                "default": "-",
                "stage": "Deprecated",
                "since": dfrom,
                "description": desc,
            }

    return result
