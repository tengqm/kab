import json
import logging

from django.conf import settings

LOG = logging.getLogger(__name__)


def parse_dict(api, data, root=None):
    if root is None:
        if settings.configured:
            base = settings.DATA_DIR
        else:
            base = "data"
    else:
        base = root

    result = {}
    for k, v in data.items():
        if isinstance(v, dict):
            result[k] = parse_dict(api, v, root=base)
        elif isinstance(v, list):
            result[k] = parse_list(api, v, root=base)
        elif isinstance(v, str):
            if k == "$ref" and v.startswith("#/definitions/"):
                def_file = "{}/{}/defs/{}.json".format(base, api, v[14:])
                return load_json(def_file, api, root=base)
            else:
                result[k] = v
        else:
            result[k] = v
    return result


def parse_list(api, data, root=None):
    result = []
    for item in data:
        if isinstance(item, dict):
            result.append(parse_dict(api, item, root=root))
        elif isinstance(item, list):
            result.append(parse_list(api, item, root=root))
        else:
            result.append(item)
    return result


def load_json(fn, apiv=None, recursive=True, root=None):
    data = {}
    try:
        with open(fn, "r") as f:
            data = json.load(f)
    except Exception as ex:
        LOG.error("Error reading data: %s", str(ex))
        return None

    if not recursive:
        return data

    result = {}

    for k, v in data.items():
        if isinstance(v, dict):
            new_v = parse_dict(apiv, v, root=root)
        elif isinstance(v, list):
            new_v = parse_list(apiv, v, root=root)
        else:
            new_v = v
        result[k] = new_v
    return result
