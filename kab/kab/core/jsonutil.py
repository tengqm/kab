import json
import logging

LOG = logging.getLogger(__name__)


def parse_dict(api, data):
    result = {}
    for k, v in data.items():
        if isinstance(v, dict):
            result[k] = parse_dict(api, v)
        elif isinstance(v, list):
            result[k] = parse_list(api, v)
        elif isinstance(v, str):
            if k == "$ref" and v.startswith("#/definitions/"):
                def_file = "data/{}/defs/{}.json".format(api, v[14:])
                return load_json(def_file, api)
            else:
                result[k] = v
        else:
            result[k] = v
    return result


def parse_list(api, data):
    result = []
    for item in data:
        if isinstance(item, dict):
            result.append(parse_dict(api, item))
        elif isinstance(item, list):
            result.append(parse_list(api, item))
        else:
            result.append(item)
    return result


def load_json(fn, apiv=None, recursive=True):
    data = {}
    try:
        with open(fn, "r") as fn:
            data = json.load(fn)
    except Exception as ex:
        LOG.error("Error reading data %s: %s", fn, str(ex))
        return None

    if not recursive:
        return data

    result = {}

    for k, v in data.items():
        if isinstance(v, dict):
            new_v = parse_dict(apiv, v)
        elif isinstance(v, list):
            new_v = parse_list(apiv, v)
        else:
            new_v = v
        result[k] = new_v
    return result
