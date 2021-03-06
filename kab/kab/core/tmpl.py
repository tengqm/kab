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

# Template module for generating jstree

import logging

from kab.core import helpers

LOG = logging.getLogger(__name__)


def _new_node(name, value, disabled=False):
    # This is for jsTree
    node = {
        "text": ": ".join(["<samp>" + name + "</samp>", str(value)]),
    }

    if disabled is True:
        node["state"] = {
            "disabled": True,
        }
    return node


def _get_boolean(v):
    value = v.get("default", None)
    if value is None and "enum" in v:
        value = v.get("enum", [])[0]
    if value is None:
        value = False
    return value


def _get_integer(v):
    value = v.get("default", None)
    if value is None and "enum" in v:
        value = v.get("enum", [])[0]
    if value is None:
        value = 0
    return value


def _get_string(v):
    value = v.get("default", None)
    if value is None and "enum" in v:
        value = v.get("enum", [])[0]
    if value is None:
        value = "<i>string</i>"
    return value


def _process_ref(parent, prop, v, api):
    target = v.get("$ref")
    if target.startswith("#/definitions/"):
        target = target[14:]
    grp, ver, name, display = helpers.parse_definition_id(target)
    tmpl = "<samp>{}</samp>: &lt;<code>{}</code>&gt;"
    # This is to break the circles
    if prop != "openAPIV3Schema" and name == "JSONSchemaProps":
        new_node = {
            "text": tmpl.format(prop, display),
            "children": []
        }
        parent["children"].append(new_node)
        return

    new_node = {
        "text": tmpl.format(prop, display),
        "a_attr": {
            "href": "/".join([api, grp, ver, name]),
        },
        "children": []
    }

    refdata = helpers.get_definition(api, grp, ver, name, False)

    _get_object(new_node, refdata, api)
    parent["children"].append(new_node)


def _get_array(parent, v, api):
    v_type = v.get("type", None)
    if v_type == "string":
        value = _get_string(v)
        parent["children"].append(_new_node("[i]", value))
    elif v_type == "integer":
        value = _get_integer(v)
        parent["children"].append(_new_node("[i]", value))
    elif v_type == "boolean":
        value = _get_boolean(v)
        parent["children"].append(_new_node("[i]", value))
    elif v_type == "array":
        new_node = {
            "text": ": ".join(["[i]", "[]"]),
            "children": [],
        }
        _get_array(new_node, v["items"], api)
        parent["children"].append(new_node)
    elif v_type == "object":
        new_node = {
            "text": ": ".join(["[i]", "{}"]),
            "children": [],
        }
        _get_object(new_node, v, api)
        parent["children"].append(new_node)
    elif "$ref" in v:
        _process_ref(parent, "[i]", v, api)
    else:
        LOG.error("type not specified for '%s'", v)


def _get_object(parent, data, api):
    for p, v in data.get("properties", {}).items():
        v_type = v.get("type", None)
        if v_type == "string":
            value = _get_string(v)
            parent["children"].append(_new_node(p, value, True))
        elif v_type == "integer":
            value = _get_integer(v)
            parent["children"].append(_new_node(p, value, True))
        elif v_type == "boolean":
            value = _get_boolean(v)
            parent["children"].append(_new_node(p, value, True))
        elif v_type == "array":
            new_node = {
                "text": "<samp>" + p + "</samp>: <i>array</i>",
                "children": [],
            }
            _get_array(new_node, v["items"], api)
            parent["children"].append(new_node)
        elif v_type == "object":
            new_node = {
                "text": "<samp>" + p + "</samp>: {}",
                "children": [],
            }
            _get_object(new_node, v, api)
            parent["children"].append(new_node)
        # check if there is a reference
        elif "$ref" in v:
            _process_ref(parent, p, v, api)
        else:
            LOG.error("Unrecognizable key: '%s'", p)


def gen_tree(api, group, version, defn):
    # recursive is set to False here for a better control of nested
    # description
    data = helpers.get_definition(api, group, version, defn, False)
    root = {
        "text": defn,
        "state": {
            "opened": True,
            "selected": True,
        },
        "children": []
    }
    # we believe the root is a dict
    _get_object(root, data, api)

    return root
