import collections
import copy
import logging
import os

from django.conf import settings

from kab import consts
from kab.core import helpers
from kab.core import jsonutil

LOG = logging.getLogger(__name__)


class Diff(object):

    def __init__(self, first, second, with_values=False):
        self.difference = []
        self.seen = []
        self.check(first, second, with_values=with_values)

    def check(self, first, second, path='', with_values=False):
        if with_values and second is not None:
            if not isinstance(first, type(second)):
                message = '%s;; %s||%s' % (path, type(first).__name__,
                                           type(second).__name__)
                self.save("TYPE", message)

        if isinstance(first, dict):
            for key in first:
                # the first part of path must not have trailing dot.
                if len(path) == 0:
                    new_path = key
                else:
                    new_path = "%s.%s" % (path, key)

                message = new_path

                if isinstance(second, dict):
                    if key in second:
                        sec = second[key]
                    else:
                        # key only in the first
                        self.save("PATH", message)
                        # prevent further values checking.
                        sec = None

                    # recursive call
                    if sec is not None:
                        self.check(first[key], sec, path=new_path,
                                   with_values=with_values)
                else:
                    # second is not dict.
                    # every key from first goes to the difference
                    self.save("PATH", message)
                    self.check(first[key], second, path=new_path,
                               with_values=with_values)

        # if object is list, loop over it and check.
        elif isinstance(first, list):
            if not isinstance(second, list):
                type1 = type(first).__name__
                type2 = type(second).__name__
                msg = '%s;; %s||%s' % (path, type1, type2)
                self.save("TYPE", msg)
                return

            # process simple type
            if not isinstance(first[0], (dict, list)):
                first = sorted(first)
                second = sorted(second)
                if first != second:
                    msg = "%s;; %s||%s" % (path, first, second)
                    self.save("VALUE", msg)
                return

            for index, item in enumerate(first):
                new_path = "%s[%s]" % (path, index)
                sec = None
                try:
                    sec = second[index]
                    self.check(item, sec, path=new_path,
                               with_values=with_values)
                except (IndexError, KeyError):
                    msg = '%s;; %s||' % (new_path, str(item))
                    self.save("VALUE", msg)

        # not list, not dict.
        # check for equality (only if with_values is True) and return.
        else:
            if with_values and second is not None:
                if first != second:
                    msg = "%s;; %s||%s" % (path, first, second)
                    self.save("VALUE", msg)
            return

    def save(self, kind, message):
        if message not in self.difference:
            self.seen.append(message)
            self.difference.append((kind, message))


def compare_data(json1, json2):
    """Return the difference between two JSON.

    The result looks like:
    {
      "ADDED": [
         "foo.bar",
         "zoo"
      ],
      "REMOVED": [
         "car.path[*].field"
      ],
      "DESCRIPTION": {
          "field.path1": {
              "BEFORE": "text1",
              "AFTER": "text2"
          },
          "(The resource)": {
              "BEFORE": "old text",
              "AFTER": "new text"
          }
      },
      "CHANGED": [
         "field.path": {
            "BEFORE": "something",
            "AFTER": "else"
         }
      ]
    }
    """

    # first round check removed properties and changed values
    diff1 = Diff(json1, json2, True).difference
    # second round check newly added properties
    diff2 = Diff(json2, json1, False).difference

    diffs = []
    for kind, message in diff1:
        newType = "REMOVED" if kind == "PATH" else "CHANGED"
        diffs.append({'type': newType, 'message': message})

    for kind, message in diff2:
        # ignore value changes
        if kind == "VALUE":
            continue
        diffs.append({'type': "ADDED", 'message': message})

    result = {}
    for diff in diffs:
        key = diff['type']
        value = diff['message']
        if (key == "CHANGED"):
            key_vals = value.split(';;')
            vals = key_vals[1].split('||')
            keypath = key_vals[0].replace("properties.", "")
            keypath = keypath.replace(".items.", "[*].")
            if keypath.endswith(".description"):
                key = "DESCRIPTION"
                keypath = keypath[:-12]
            elif keypath == "description":
                key = "DESCRIPTION"
                keypath = "(The Resource)"
            value = {
                keypath: {
                    "BEFORE": vals[0].strip(),
                    "AFTER": vals[1].strip(),
                }
            }
        else:
            # handle pseudo jsonpath for object properties and array items
            value = value.replace("properties.", "")
            value = value.replace(".items.", "[*].")

        out_vals = result.get(key)
        if (out_vals):
            out_vals.append(value)
            result[key] = out_vals
        else:
            result[key] = [value]

    return result


def compare(apis, file1, file2, root=None):
    """Compare two JSON files.

    :param apis: The APIs for the two files.
    :param file1: Name for the first definition file.
    :param file2: Name for the second definition file.
    :returns: None if either one of the data cannot be loaded.
    """

    json1 = jsonutil.load_json(file1, apis[0], root=root)
    if json1 is None:
        return None

    json2 = jsonutil.load_json(file2, apis[-1], root=root)
    if json2 is None:
        return None

    return compare_data(json1, json2)


def _definition_filename(api, group, version, kind, root=None):

    if root is None:
        if settings.configured:
            fmt = settings.DATA_DIR + "/{}/defs/{}.json"
        else:
            fmt = "data/{}/defs/{}.json"
    else:
        fmt = root + "/{}/defs/{}.json"

    if kind == "Info":
        fn = "io.k8s.apimachinery.pkg.version.Info"
    elif kind == "IntOrString":
        fn = "io.k8s.apimachinery.pkg.util.intstr.IntOrString"
    elif kind == "RawExtension":
        fn = "io.k8s.apimachinery.pkg.runtime.RawExtension"
    elif kind == "Quantity":
        fn = "io.k8s.apimachinery.pkg.api.resource.Quantity"
    else:
        fn = ".".join([group, version, kind])

    return fmt.format(api, fn)


def compare_defs(apis, groups, versions, kinds, root=None):

    file0 = _definition_filename(apis[0], groups[0], versions[0], kinds[0])
    file1 = _definition_filename(apis[-1], groups[-1], versions[-1], kinds[-1])

    return compare(apis, file0, file1, root=root)


def _populate_parameters(apiv, param_list):

    param_dict = helpers.parameters(apiv)

    data = {}
    for p in param_list:
        if "$ref" not in p:
            data[p["name"]] = p
            continue
        pref = p.pop("$ref")
        param_name = pref[13:]
        if param_name not in param_dict:
            LOG.warning("Parameter %s not found!", param_name)
            continue
        item = copy.deepcopy(p)
        item.update(param_dict.get(param_name))
        data[item["name"]] = item

    return collections.OrderedDict(sorted(data.items()))


def compare_ops(apis, opids, root=None):
    """Returns the diff between any two operations.

    The returned result looks like:
    {
       /* basic JSON diff for operation definition JSON */
       "P_ADDED": {
          "p1": "<HTML formatted text>",
          "p2": "<HTML formatted desc>"
        },
        "P_REMOVED": {
          "p0": "<HTML formatted text>"
        },
        "P_CHANGED": {
          "p3": {
            "BEFORE": "raw data",
            "AFTER": "raw data"
          }
    }
    """

    if root is None:
        fmt = helpers.DATA_PATH + "/{}/ops/{}.json"
    else:
        fmt = root + "/{}/ops/{}.json"

    file0 = fmt.format(apis[0], opids[0])
    file1 = fmt.format(apis[-1], opids[-1])

    json1 = jsonutil.load_json(file0, apis[0], False)
    if json1 is None:
        return None

    json2 = jsonutil.load_json(file1, apis[-1], False)
    if json2 is None:
        return None

    # basic JSON diff
    params1 = json1.pop("parameters", [])
    params2 = json2.pop("parameters", [])
    result = compare_data(json1, json2)

    # handle the parameters
    parameters1 = _populate_parameters(apis[0], params1)
    parameters2 = _populate_parameters(apis[-1], params2)

    for p, v in parameters1.items():
        if p not in parameters2:
            removed = result.get("P_REMOVED", {})
            removed[p] = v
            result["P_REMOVED"] = removed
        elif parameters1[p] != parameters2[p]:
            changed = result.get("P_CHANGED", {})
            items1 = sorted(parameters1[p].items())
            items2 = sorted(parameters2[p].items())
            changed[p] = {
                "BEFORE": collections.OrderedDict(sorted(items1)),
                "AFTER": collections.OrderedDict(sorted(items2)),
            }
            result["P_CHANGED"] = changed

    for p, v in parameters2.items():
        if p not in parameters1:
            added = result.get("P_ADDED", {})
            added[p] = v
            result["P_ADDED"] = added

    return result


def _parse_version(version):
    """Split version into major and minor"""

    vs = version.split(".")
    if len(vs) != 2:
        return -1, -1
    return int(vs[0]), int(vs[1])


def history(data_type, fname, ver_to=None, ver_from=None):
    """Get history of a particular definition or operation.

    :param data_type: "defs" or "ops"
    :param fname: the base name of the file to compare.
    :param ver_to: the last version number string, optional.
    :param ver_from": the first version number string, optional.
    """

    if ver_from is None:
        ver_from = consts.API_VERSIONS[0]
    if ver_to is None:
        ver_to = consts.API_VERSIONS[-1]

    vmajor0, vminor0 = _parse_version(ver_from)
    vmajor1, vminor1 = _parse_version(ver_to)

    if (vminor0 == vminor1) and (vmajor0 == vmajor1):
        LOG.error("the two versions specified cannot be the same")
        return None

    minor_from = vminor0
    minor_to = vminor0 + 1
    key = os.path.splitext(fname)[0]
    result = {}
    while True:
        v0 = str(vmajor0) + "." + str(minor_from)
        v1 = str(vmajor1) + "." + str(minor_to)

        file0 = os.path.join(helpers.DATA_PATH, v0, data_type, fname)
        file1 = os.path.join(helpers.DATA_PATH, v1, data_type, fname)

        if not os.path.isfile(file0):
            if os.path.isfile(file1):
                result[v1] = {"status": "ADDED"}
        elif not os.path.isfile(file1):
            if os.path.isfile(file0):
                result[v1] = {"status": "DELETED"}
        else:
            if data_type == "defs":
                res = compare([v0, v1], file0, file1)

                # The following is jsonpatch, the difference generated for
                # description fields is not good. We can improve the
                # module to generate something similar to JSON Patch format.
                # j1 = jsonutil.load_json(file0, v0, root=".")
                # j2 = jsonutil.load_json(file1, v1, root=".")
                # d = jsonpatch.JsonPatch.from_diff(j1, j2)
                # res = json.loads(d.to_string())
            elif data_type == "ops":
                res = compare_ops([v0, v1], [key])

            if res:
                result[v1] = {"status": "CHANGED", "changes": res}

        # Done?
        if minor_to == vminor1:
            break
        minor_from += 1
        minor_to += 1

    return result
