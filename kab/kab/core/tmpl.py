# Template module for generating jstree

from kab.core import helpers


def gen_tree(apiv, group, version, defn):
    # def_name is too short, need full path
    data = helpers.get_definition(apiv, group, version, defn, True)
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
