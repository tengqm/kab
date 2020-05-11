import json
import logging
import sys

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
            for index, item in enumerate(first):
                new_path = "%s[%s]" % (path, index)
                # try to get the same index from second
                sec = None
                if second is not None:
                    try:
                        sec = second[index]
                    except (IndexError, KeyError):
                        # goes to differenc
                        type1 = type(first).__name__
                        type2 = type(second).__name__
                        msg = '%s;; %s||%s' % (new_path, type1, type2)
                        self.save("TYPE", msg)

                # recursive call
                self.check(first[index], sec, path=new_path,
                           with_values=with_values)

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


def load_data(api, fn):
    data = {}
    try:
        with open(fn, "r") as f:
            data = json.loads(f.read())
    except Exception as ex:
        LOG.error("Error reading data %s: %s", fn, str(ex))
        return None

    result = {}

    for k, v in data.items():
        if isinstance(v, dict):
            new_v = parse_dict(api, v)
        elif isinstance(v, list):
            new_v = parse_list(api, v)
        else:
            new_v = v
        result[k] = new_v
    return result


def parse_dict(api, data):
    result = {}
    for k, v in data.items():
        if k == "$ref":
            if v.startswith("#/definitions/"):
                def_file = "data/{}/defs/{}.json".format(api, v[14:])
                return load_data(api, def_file)
        elif isinstance(v, dict):
            result[k] = parse_dict(api, v)
        elif isinstance(v, list):
            result[k] = parse_list(api, v)
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


def compare(apis, file1, file2):
    """Compare two JSON files.

    :param apis: The APIs for the two files.
    :param file1: Name for the first definition file.
    :param file2: Name for the second definition file.
    :returns: None if either one of the data cannot be loaded.
    """

    json1 = load_data(apis[0], file1)
    if json1 is None:
        return None

    json2 = load_data(apis[-1], file2)
    if json2 is None:
        return None

    # first round check removed properties and changed values
    diff1 = Diff(json1, json2, True).difference
    # second round check newly added properties
    diff2 = Diff(json2, json1, False).difference

    diffs = []
    for kind, message in diff1:
        newType = "CHANGED"
        if kind == "PATH":
            newType = "REMOVED"
        diffs.append({'type': newType, 'message': message})

    for kind, message in diff2:
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
            value = value.replace("properties.", "")
            value = value.replace(".items.", "[*].")

        out_vals = result.get(key)
        if (out_vals):
            out_vals.append(value)
            result[key] = out_vals
        else:
            result[key] = [value]

    return result


def compare_defs(apis, groups, versions, kinds):
    fmt = "data/{}/defs/{}.json"

    if kinds[0] == "Info":
        fn0 = "io.k8s.apimachinery.pkg.version.Info"
    elif kinds[0] == "IntOrString":
        fn0 = "io.k8s.apimachinery.pkg.util.intstr.IntOrString"
    elif kinds[0] == "RawExtension":
        fn0 = "io.k8s.apimachinery.pkg.runtime.RawExtension"
    elif kinds[0] == "Quantity":
        fn0 = "io.k8s.apimachinery.pkg.api.resource.Quantity"
    else:
        fn0 = ".".join([groups[0], versions[0], kinds[0]])
    file0 = fmt.format(apis[0], fn0)

    if kinds[-1] == "Info":
        fn1 = "io.k8s.apimachinery.pkg.version.Info"
    elif kinds[-1] == "IntOrString":
        fn1 = "io.k8s.apimachinery.pkg.util.intstr.IntOrString"
    elif kinds[-1] == "RawExtension":
        fn1 = "io.k8s.apimachinery.pkg.runtime.RawExtension"
    elif kinds[-1] == "Quantity":
        fn1 = "io.k8s.apimachinery.pkg.api.resource.Quantity"
    else:
        fn1 = ".".join([groups[-1], versions[-1], kinds[-1]])
    file1 = fmt.format(apis[-1], fn1)

    return compare(apis, file0, file1)


def compare_ops(apis, opid):
    fmt = "data/{}/ops/{}.json"

    file0 = fmt.format(apis[0], opid)
    file1 = fmt.format(apis[-1], opid)

    return compare(apis, file0, file1)
