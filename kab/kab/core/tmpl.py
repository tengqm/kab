# Template module for generating manifests out of API schema
import logging
from os import path

from kab.core import helpers
from kab.core import jsondiff

LOG = logging.getLogger(__name__)


def get_schema(apiv, group, version, defn):
    # def_name is too short, need full path
    if defn == "Info":
        fn = "io.k8s.apimachinery.pkg.version.Info"
    elif defn == "IntOrString":
        fn = "io.k8s.apimachinery.pkg.util.intstr.IntOrString"
    elif defn == "RawExtension":
        fn = "io.k8s.apimachinery.pkg.runtime.RawExtension"
    elif defn == "Quantity":
        fn = "io.k8s.apimachinery.pkg.api.resource.Quantity"
    else:
        gpath = helpers.group_path(group)
        fn = gpath + "." + version + "." + defn

    fpath = path.join("data", apiv, "defs", fn + ".json")
    data = jsondiff.load_data(apiv, fpath)
    return data


def gen_tree(apiv, group, version, defn):
    # def_name is too short, need full path
    data = get_schema(apiv, group, version, defn)
    root = {
        "text": "mypod",
        "children": []
    }
    parent = root
    for p, v in data.get("properties", {}).items():
        v_type = v.get("type", None)
        if v_type == "string":
            value = v.get("default", None)
            if value is None and "enum" in v:
                value = v.get("enum", [])[0]
            if value is None:
                value = "<input>"

            parent["children"].append({"text": ": ".join([p, value])})
        elif v_type == "integer":
            value = v.get("default", None)
            if value is None and "enum" in v:
                value = v.get("enum", [])[0]
            if value is None:
                value = 0

            parent["children"].append({"text": ": ".join([p, value])})
        elif v_type == "boolean":
            value = v.get("default", None)
            if value is None and "enum" in v:
                value = v.get("enum", [])[0]
            if value is None:
                value = False

            parent["children"].append({"text": ": ".join([p, value])})
        elif v_type == "array":
            parent["children"].append({"text": ": ".join([p, "[]"])})
        else:
            parent["children"].append({"text": ": ".join([p, "{}"])})

    return root
