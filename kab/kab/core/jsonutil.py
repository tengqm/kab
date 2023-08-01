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

import json
import logging

from django.conf import settings

LOG = logging.getLogger(__name__)


def _parse_dict(api, data, prop, root=None):
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
    try:

        with open(fn, "r") as f:
            data = json.load(f)
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
    return result
