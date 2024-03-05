#!/usr/bin/env python3

import json
import logging
import os
import sys

import markdown
import yaml

LOG = logging.getLogger(__name__)
MD = markdown.Markdown(
    extensions=["codehilite", "tables", "fenced_code", "toc"])


def _parse_dict(api, data, prop, root=None):
    base = root

    result = {}
    for k, v in data.items():
        if isinstance(v, dict):
            result[k] = _parse_dict(api, v, k, root=base)
        elif isinstance(v, list):
            result[k] = _parse_list(api, v, k, root=base)
        elif isinstance(v, str):
            if k == "$ref" and v.startswith("#/definitions/"):
                def_file = "{}/{}/defs/{}.json".format(base, api, v[14:])
                needle = "JSONSchemaProps"
                if (v.endswith(needle) and prop != "openAPIV3Schema"):
                    return {
                        "type": "object",
                        "description": "A nested JSONSchemaProps object",
                    }
                return load_json(def_file, api, root=base)
            result[k] = v
        else:
            result[k] = v
        if 'x-kab-description-zh' in result:
            des = result.get('x-kab-description-zh', '')
            result['description'] = des
            # result['description'] = MD.reset().convert(des)
            del result['x-kab-description-zh']

    return result


def _parse_list(api, data, prop, root=None):
    result = []
    for item in data:
        if isinstance(item, dict):
            result.append(_parse_dict(api, item, prop, root=root))
        elif isinstance(item, list):
            result.append(_parse_list(api, item, prop, root=root))
        else:
            result.append(item)
    return result


def load_json(fn, api=None, recursive=True, root=None):
    data = {}
    if not os.path.exists(fn):
        fn = fn[:-5] + ".yaml"
    try:
        with open(fn, "r") as f:
            if fn.endswith(".json"):
                data = json.load(f)
            else:
                data = yaml.load(f, Loader=yaml.CLoader)
    except Exception as ex:
        LOG.error("Cannot read file %s: %s", fn, str(ex))
        return None

    if not recursive:
        return data

    result = {}

    for k, v in data.items():
        if isinstance(v, dict):
            new_v = _parse_dict(api, v, k, root=root)
        elif isinstance(v, list):
            new_v = _parse_list(api, v, k, root=root)
        else:
            new_v = v
        result[k] = new_v
    
    if 'x-kab-description-zh' in data:
        des = result.get('x-kab-description-zh', '')
        result['description'] = des
        del result['x-kab-description-zh']

    return result


def main():
    if (len(sys.argv) < 2):
        print("\nThis tool consumes a API specification in YAML and replaces"
              " the English version of `description`\nwith the Chinese version"
              " that is given in the `x-kab-description-zh` property.\n")
        print("Usage:\n  %s <path-to-yaml> [<version>]\n" % sys.argv[0]) 
        return

    fn = sys.argv[1]
    version = '1.29'
    if len(sys.argv) == 3:
        version = sys.argv[2]

    d = load_json(fn, api=version, recursive=True, root='.')
    print(json.dumps(d, indent=2, sort_keys=True, ensure_ascii=False))


if __name__ == '__main__':
    main()
