import base64
import collections
import json
import logging

from django.apps import apps
from django import template
from django.utils import safestring
import markdown
import pygments
from pygments import formatters
from pygments import lexers

from kab.core import helpers

register = template.Library()
LOG = logging.getLogger(__name__)


@register.filter(is_safe=True)
def label_with_class(value, arg):
    """Style adjustments"""
    return value.label_tag(attrs={'class': arg})


@register.filter(is_safe=True)
def widget_with_class(value, arg):
    """Style adjustments for widget"""
    return value.as_widget(attrs={'class': arg})


@register.simple_tag()
def object_data(instance, app_name=None):
    fields = {}
    for field in instance.class_meta.get_fields():
        fields[field.verbose_name] = getattr(instance, field.name)
    return fields


@register.simple_tag()
def format_json(value):
    try:
        if isinstance(value, str):
            data = json.loads(value)
        else:
            data = value
        result = json.dumps(data, indent=2, sort_keys=True)
    except Exception:
        result = value
    return safestring.mark_safe(result)


@register.filter()
def in_list(value, a_list):
    value = str(value)
    return value in a_list.split(",")


@register.filter()
def not_in_list(value, a_list):
    value = str(value)
    return value not in a_list.split(',')


@register.simple_tag()
def split_csv(value, sep, fields):
    if not value:
        return None

    values = value.split(sep)
    results = []
    while True:
        if len(values) < fields:
            break
        sub = values[:fields]
        results.append(sub)
        values = values[fields:]
    return results


@register.simple_tag()
def var_as_list(value):
    if not value:
        return []

    parts = value.split("|")
    if len(parts) < 3:
        return []
    try:
        parts[2] = base64.b64decode(parts[2]).decode()
    except Exception:
        pass
    return parts


@register.simple_tag()
def list_as_string(value):
    if not value:
        return ""

    if not isinstance(value, list):
        return str(value)

    vals = [str(v) for v in value]
    return ",".join(vals)


@register.simple_tag()
def group_version(value):
    if value == "*":
        return "*", "*"
    parts = value.split(".")
    if len(parts) == 1:
        return value, ""
    return parts[0], parts[1]


def _htmlify(data, lang, lineno=True):
    if not data:
        return ""
    if data.strip() == "":
        return ""

    if lang == "PowerShell":
        lexer = lexers.PowerShellLexer()
    elif lang == "Bash":
        lexer = lexers.BashLexer()
    elif lang == "JSON":
        lexer = lexers.JsonLexer()
    elif lang == "Python":
        lexer = lexers.PythonLexer()
    elif lang == "HTML":
        lexer = lexers.HtmlLexer()
    else:
        lexer = lexers.IniLexer()

    if lineno:
        formatter = formatters.HtmlFormatter(linenos="table", style="colorful")
    else:
        formatter = formatters.HtmlFormatter(style="colorful")

    result = pygments.highlight(data, lexer, formatter)
    return safestring.mark_safe(result)


@register.simple_tag()
def code_html(code, lang):
    return _htmlify(code, lang, True)


@register.simple_tag()
def json_html(json_data):
    if not isinstance(json_data, str):
        data = json.dumps(json_data, indent=2, sort_keys=True)
        return _htmlify(data, "JSON", False)

    try:
        data = json.dumps(json.loads(json_data), indent=2, sort_keys=True)
        return _htmlify(data, "JSON", False)
    except Exception:
        if '<!doctype html>' in json_data.lower():
            return _htmlify(json_data, "HTML", False)
        return safestring.mark_safe('<pre>' + json_data + '</pre>')


@register.simple_tag()
def markdown_html(mddoc):
    try:
        html = markdown.markdown(mddoc, extensions=["extra"])
        return safestring.mark_safe(html)
    except Exception as ex:
        LOG.exception(ex)
        return mddoc


@register.simple_tag()
def parse_errors(raw):
    if raw is None or len(raw) == 0:
        return []

    try:
        if isinstance(raw, list):
            data = raw
        else:
            data = json.loads(raw)
        result = []
        for item in data:
            if not isinstance(item, dict):
                result.append({"type": "Error", "detail": str(item)})
                continue
            for k, v in item.items():
                result.append({"type": str(k), "detail": str(v)})
        return result
    except Exception as ex:
        LOG.exception(ex)
        return [{"type": "error", "detail": str(raw)}]


@register.simple_tag()
def field_class(field):
    widget = field.field.widget
    if type(widget).__name__ == "Textarea":
        return "fileinput"
    return ""


@register.simple_tag()
def app_installed(app):
    app_name = "kab.{0}".format(app)
    return apps.is_installed(app_name)


@register.simple_tag()
def verb_no_data(verb):
    return verb.upper() not in ["POST", "PUT", "PATCH"]


@register.filter(is_safe=True)
def dos_str(value):
    """Style adjustments"""
    try:
        data = json.loads(value)
        return json.dumps(data, indent=4)
    except Exception:
        return value


@register.filter(is_safe=True)
def humanize_name(name):
    parts = name.rsplit(".", 1)
    if len(parts) != 2:
        return name
    if parts[1] in ("CREATE", "UPDATE", "GET", "PATCH"):
        return parts[0] + " (" + parts[1].lower() + ")"
    return parts[1]


@register.simple_tag()
def dereference(api, group, ver, defn):
    tmpl = "/apis/definition/{}/{}/{}/{}/"
    link = tmpl.format(api, group, ver, defn)
    parts = defn.split(".")
    if len(parts) == 1:
        anchor = defn
    else:
        anchor = parts[0] + " (" + parts[1].lower() + ")"
    return link, anchor


def _simplify_ref(api, ref):

    if not ref.startswith("#/definitions/"):
        return ref
    defn = ref[14:]
    group, version, def_name, display_name = helpers.parse_definition_id(defn)

    tmpl = "/apis/definition/{}/{}/{}/{}"
    target = tmpl.format(api, group, version, def_name)
    return [target, display_name]


def _escape_list(api, value):
    data = []
    for v in value:
        if isinstance(v, dict):
            new_v = _escape_obj(api, v)
        elif isinstance(v, list):
            new_v = _escape_list(api, v)
        else:
            new_v = v
        data.append(new_v)

    return data


def _escape_obj(api, value):
    data = {}
    for k, v in value.items():
        if isinstance(v, dict):
            new_v = _escape_obj(api, v)
        elif isinstance(v, list):
            new_v = _escape_list(api, v)
        else:
            new_v = v

        if k == "$ref":
            data["REF"] = _simplify_ref(api, new_v)
        else:
            data[k] = new_v
    return data


@register.simple_tag()
def escape_ref(api, value):
    if isinstance(value, str):
        data = json.loads(value)
    else:
        data = value

    if isinstance(data, dict):
        return _escape_obj(api, data)
    if isinstance(data, list):
        return _escape_list(api, data)
    return data


@register.filter()
def safedict(data):
    return data.items()


@register.simple_tag()
def patch_strategy(data):
    return data.get("x-kubernetes-patch-strategy", "")


@register.simple_tag()
def patch_merge_key(data):
    return data.get("x-kubernetes-patch-merge-key", "")


@register.simple_tag()
def list_type(data):
    return data.get("x-kubernetes-list-type", "")


@register.simple_tag()
def list_map_keys(data):
    return data.get("x-kubernetes-list-map-keys", "")


@register.simple_tag()
def map_type(data):
    return data.get("x-kubernetes-map-type", "")


@register.simple_tag()
def sort(value):
    if isinstance(value, dict):
        new_dict = collections.OrderedDict()
        for k in sorted(value.keys()):
            new_dict[k] = value[k]
        return new_dict
    elif isinstance(value, list):
        return sorted(value)
    return value
