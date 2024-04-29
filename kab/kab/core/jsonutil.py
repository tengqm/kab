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
import os

from django.conf import settings
from django.utils import translation
import yaml

LOG = logging.getLogger(__name__)


def _parse_dict(api, data, prop, recursive, root=None, lang='en'):
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
            result[k] = _parse_dict(api, v, k, recursive, root=base, lang=lang)
        elif isinstance(v, list):
            result[k] = _parse_list(api, v, k, recursive, root=base)
        elif isinstance(v, str):
            if k == "$ref" and recursive and v.startswith("#/definitions/"):
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

        if lang == 'zh' and  'x-kab-description-zh' in result:
            result['description'] = result['x-kab-description-zh']

    return result


def _parse_list(api, data, prop, recursive, root=None, lang='en'):
    result = []
    for item in data:
        if isinstance(item, dict):
            result.append(_parse_dict(api, item, prop, recursive, root=root, lang=lang))
        elif isinstance(item, list):
            result.append(_parse_list(api, item, prop, recursive, root=root, lang=lang))
        else:
            result.append(item)
    return result


def load_json(fn, api=None, recursive=True, root=None):
    lang = translation.get_language()
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

    result = {}
    
    for k, v in data.items():
        if isinstance(v, dict):
            new_v = _parse_dict(api, v, k, recursive, root=root, lang=lang)
        elif isinstance(v, list):
            new_v = _parse_list(api, v, k, recursive, root=root, lang=lang)
        else:
            new_v = v
        result[k] = new_v

    if lang == 'zh' and 'x-kab-description-zh' in data:
        result['description'] = result.get('x-kab-description-zh', '')
    return result
