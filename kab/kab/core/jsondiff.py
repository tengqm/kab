import collections
import copy
import difflib
import logging
import yaml

from django.conf import settings
import markdown
import pygments
from pygments import formatters
from pygments import lexers

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


def compare_defs(apis, groups, versions, kinds, root=None):
    if root is None:
        if settings.configured:
            fmt = settings.DATA_DIR + "/{}/defs/{}.json"
        else:
            fmt = "data/{}/defs/{}.json"
    else:
        fmt = root + "/{}/defs/{}.json"
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

    return compare(apis, file0, file1, root=root)


def populate_parameters(apiv, param_list):
    param_dict = helpers.parameters(apiv)

    data = {}
    for p in param_list:
        if "$ref" not in p:
            data[p["name"]] = p
            continue
        pref = p.pop("$ref")
        param_name = pref[13:]
        if param_name not in param_dict:
            LOG.error("Parameter %s not found!", param_name)
            continue
        item = copy.deepcopy(p)
        item.update(param_dict.get(param_name))
        data[item["name"]] = item

    return collections.OrderedDict(sorted(data.items()))


def json_html(data):
    if not data:
        return ""

    if not isinstance(data, str):
        data = yaml.dump(data, indent=2, default_flow_style=False)

    if data.strip() == "":
        return ""

    lexer = lexers.YamlLexer()
    formatter = formatters.HtmlFormatter(style="colorful")
    return pygments.highlight(data, lexer, formatter)


def compare_ops(apis, opids, root=None):
    if root is None:
        fmt = settings.DATA_DIR + "/{}/ops/{}.json"
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

    params1 = json1.pop("parameters", [])
    params2 = json2.pop("parameters", [])

    parameters1 = populate_parameters(apis[0], params1)
    parameters2 = populate_parameters(apis[-1], params2)

    # basic JSON diff
    result = compare_data(json1, json2)

    for p, v in parameters1.items():
        if p not in parameters2:
            removed = result.get("P_REMOVED", {})
            removed[p] = json_html(v)
            result["P_REMOVED"] = removed
        elif parameters1[p] != parameters2[p]:
            changed = result.get("P_CHANGED", {})
            changed[p] = {
                "BEFORE": parameters1[p],
                "AFTER": parameters2[p]
            }
            result["P_CHANGED"] = changed

    for p, v in parameters2.items():
        if p not in parameters1:
            added = result.get("P_ADDED", {})
            added[p] = json_html(v)
            result["P_ADDED"] = added

    return result


def compare_text(text1, text2):
    """Compare two markdown texts and return the diff as annotated HTML."""
    d1 = markdown.markdown(text1, extensions=["extra"])
    d2 = markdown.markdown(text2, extensions=["extra"])
    if d1.startswith("<p>") and d1.endswith("</p>"):
        d1 = d1[3:-4]
    if d2.startswith("<p>") and d2.endswith("</p>"):
        d2 = d2[3:-4]

    sm = difflib.SequenceMatcher(lambda x: x == " ", d1, d2)

    output = []
    for opcode, a0, a1, b0, b1 in sm.get_opcodes():
        if opcode == 'equal':
            output.append(sm.a[a0:a1])
        elif opcode == 'insert':
            output.append("<ins>" + sm.b[b0:b1] + "</ins>")
        elif opcode == 'delete':
            output.append("<del>" + sm.a[a0:a1] + "</del>")
        elif opcode == 'replace':
            output.append("<ins>" + sm.b[b0:b1] + "</ins>" +
                          "<del>" + sm.a[a0:a1] + "</del>")
        else:
            LOG.error("Unknown opcode")

    res = ''.join(output)
    return res
