import collections
import copy
import json
import logging
from urllib import parse

from django import http
from django import shortcuts
from django import urls
from django.views import generic

from kab.core import helpers
from kab.core import jsondiff
from kab.core import tmpl

LOG = logging.getLogger(__name__)


def home(req):
    return shortcuts.render(req, 'index.html')


class ListAPIs(generic.View):
    """Generic view to list API versions"""

    def get(self, req, *args, **kwargs):
        result = {}
        for apiv in helpers.apis():
            result[apiv] = helpers.api_summary(apiv)
        ctx = {
            "APIS": result,
        }
        return shortcuts.render(req, 'core/apis.html', ctx)


class SwitchAPI(generic.View):
    """Generic view to Switch API version"""

    def get(self, req, *args, **kwargs):
        new_api = kwargs.get("api")
        def_target = urls.reverse("list-resources", args=(new_api, "all"))
        orig_url = ""
        try:
            orig_url = req.META.get("HTTP_REFERER")
        except Exception:
            LOG.warning("HTTP_REFERER not found")
            return http.HttpResponseRedirect(def_target)

        o = parse.urlparse(orig_url)
        try:
            rm = urls.resolve(o.path)
            new_kwargs = copy.deepcopy(rm.kwargs)
        except Exception as ex:
            LOG.warning("Failed resolving origin path: %s", str(ex))
            return http.HttpResponseRedirect(def_target)

        new_kwargs["api"] = new_api
        new_target = urls.reverse(rm.url_name, kwargs=new_kwargs)
        return http.HttpResponseRedirect(new_target)


class ListResources(generic.View):
    """Generic view for listing API resources"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.get('api')
        if not apiv:
            apiv = helpers.latest_api()
        group_version = kwargs.get('group')
        resources = helpers.resources(apiv, group_version)
        ctx = {
            "API": apiv,
            "RESOURCES": resources,
        }
        return shortcuts.render(req, 'core/resources.html', ctx)


class ListDefinitions(generic.View):
    """Generic view for listing definitions"""

    def get(self, req, **kwargs):
        apiv = kwargs.get("api")
        if not apiv:
            apiv = helpers.latest_api()

        gname = req.GET.get("group")

        result = {}
        for item in helpers.definitions(apiv):
            if item["group"] != "":
                gv = item["group"] + "." + item["version"]
            else:
                gv = "*"
            deflist = result.get(gv, [])
            deflist.append({
                "name": item["name"],
                "display": item["display"]
            })
            result[gv] = deflist

        ctx = {
            "API": apiv,
            "GROUP": gname,
            "DEFINITIONS": collections.OrderedDict(sorted(result.items())),
        }
        return shortcuts.render(req, 'core/definition-list.html', ctx)


class ListOperations(generic.View):
    """Generic view to display API resources"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.get('api')
        if not apiv:
            apiv = helpers.latest_api()
        group = kwargs.pop('group')
        operations = helpers.operations(apiv, group)
        ctx = {
            "API": apiv,
            "OPS": operations,
        }
        return shortcuts.render(req, 'core/operation-list.html', ctx)


class ViewDefinition(generic.View):
    """Generic view to display a definition"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.pop('api')
        group = kwargs.pop('group')
        version = kwargs.pop('version')
        name = kwargs.pop('name')

        definition = helpers.get_definition(apiv, group, version, name)
        name_parts = name.split(".")
        appears_in = helpers.definition_appears_in(apiv, name)
        versions = helpers.definition_versions(name)

        # filter out current group and version
        found = False
        vlist = []
        for v in versions.get(apiv, []):
            if group == "*" and version == "*":
                found = True
            elif v["group"] == group and v["version"] == version:
                found = True
            else:
                vlist.append(v)

        if not found:
            # definition is not found
            ctx = {
                "TYPE": "Definition",
                "API": apiv,
                "GROUP": group,
                "VERSION": version,
                "NAME": name,
            }
            return shortcuts.render(req, 'notfound.html', ctx)

        if len(vlist) > 0:
            versions[apiv] = vlist
        else:
            versions.pop(apiv)

        kind = name_parts[0]
        is_resource = helpers.is_resource(kind)
        if is_resource:
            operations = helpers.resource_operations(kind, version)
        else:
            operations = []
        ctx = {
            "API": apiv,
            "GROUP": group,
            "VERSION": version,
            "APPEARS_IN": appears_in,
            "VERSIONS": versions,
            "KIND": name_parts[0],
            "NAME": name,
            "VARIANT": "" if len(name_parts) == 1 else name_parts[1],
            "IS_RESOURCE": is_resource,
            "DEFINITION": definition,
            "OPERATIONS": operations,
        }
        return shortcuts.render(req, 'core/view-definition.html', ctx)


class ViewOperation(generic.View):
    """Generic view to display a definition"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.pop('api')
        name = kwargs.pop('name')
        op = helpers.get_operation(apiv, name)
        params = helpers.parse_params(apiv, op["spec"])
        ctx = {
            "API": apiv,
            "OP": op["spec"],
            'PATH': [p for p in params if p['in'] == 'path'],
            'QUERY': [p for p in params if p['in'] == 'query'],
            'BODY': [p for p in params if p['in'] == 'body'],
            "VERSIONS": op["other_versions"],
            # 'EXTENSIONS': .extensions,
        }

        return shortcuts.render(req, 'core/view-op.html', ctx)


class CompareDefinitions(generic.View):
    """Generic view to display the comparison between two definitions"""

    def get(self, req, *args, **kwargs):
        ctx = {
            "APIS": helpers.apis(),
            "RESULT": [],

        }
        return shortcuts.render(req, 'core/compare-defs.html', ctx)

    def compare_tuple(self, t1, t2):
        """Compare two tuples.
        Each tuple contains (api-version, group-name, group-ver, definition)
        :returns: A tuple with the older version before the newer one.
        """
        # test version
        if t1[0] != t2[0]:
            return (t1, t2) if t1[0] < t2[0] else (t2, t1)

        # test group name
        if t1[1] != t2[1]:
            return (t1, t2) if t1[1] < t2[1] else (t2, t1)

        # test version
        # v2 > v1 > v2beta2 > v2beta1 > v1beta1 > v2alpha1 > v1alpha1
        if t1[2] != t2[2]:
            if ("alpha" not in t1[2] and "beta" not in t1[2] or
                    "alpha" not in t2[2] and "beta" not in t2[2]):
                return (t1, t2) if t1[2] > t2[2] else (t2, t1)
            else:
                return (t1, t2) if t1[2] < t2[2] else (t2, t1)

        return (t1, t2) if t1[3] < t2[3] else (t2, t1)

    def post(self, req, *args, **kwargs):
        api1 = req.POST.get('api1')
        api2 = req.POST.get('api2', api1)
        grp1 = req.POST.get('group1')
        grp2 = req.POST.get('group2', grp1)
        ver1 = req.POST.get('version1')
        ver2 = req.POST.get('version2', ver1)
        def1 = req.POST.get("def1")
        def2 = req.POST.get("def2", def1)

        tuple1 = (api1, grp1, ver1, def1)
        tuple2 = (api2, grp2, ver2, def2)
        tuple1, tuple2 = self.compare_tuple(tuple1, tuple2)
        api1, grp1, ver1, def1 = tuple1
        api2, grp2, ver2, def2 = tuple2

        grps1 = helpers.groups(api1)
        grps2 = helpers.groups(api2)
        vers1 = helpers.group_versions(api1, grp1)
        vers2 = helpers.group_versions(api2, grp2)
        defs1 = helpers.definitions(api1, grp1, ver1)
        defs2 = helpers.definitions(api2, grp2, ver2)

        gpath1 = helpers.group_path(grp1)
        gpath2 = helpers.group_path(grp2)

        result = jsondiff.compare_defs([api1, api2], [gpath1, gpath2],
                                       [ver1, ver2], [def1, def2])

        # customize description changes
        desc = []
        for r in result.get("DESCRIPTION", []):
            obj = {}
            for k, v in r.items():
                obj[k] = helpers.compare_text(v["BEFORE"], v["AFTER"])
            desc.append(obj)
        if len(desc) > 0:
            result["DESCRIPTION"] = desc

        # customize identical result
        if not result:
            result["IDENTICAL"] = True

        ctx = {
            "APIS": helpers.apis(),
            "API": api1,
            "API1": api1,
            "API2": api2,
            "GRP1": grp1,
            "GRP2": grp2,
            "VER1": ver1,
            "VER2": ver2,
            "DEF1": def1,
            "DEF2": def2,
            "GROUPS1": grps1,
            "GROUPS2": grps2,
            "VERSIONS1": vers1,
            "VERSIONS2": vers2,
            "DEFINITIONS1": defs1,
            "DEFINITIONS2": defs2,
            "RESULT": result,
        }
        return shortcuts.render(req, 'core/compare-defs.html', ctx)


class CompareOperations(generic.View):
    """Generic view to display the comparison between two operations"""

    def get(self, req, *args, **kwargs):
        ctx = {
            "APIS": helpers.apis(),
            "RESULT": [],

        }
        return shortcuts.render(req, 'core/compare-ops.html', ctx)

    def post(self, req, *args, **kwargs):
        api1 = req.POST.get('api1')
        api2 = req.POST.get('api2', api1)
        opid = req.POST.get("op")

        result = jsondiff.compare_ops([api1, api2], opid)

        # customize description changes
        desc = []
        for r in result.get("DESCRIPTION", []):
            obj = {}
            for k, v in r.items():
                obj[k] = helpers.compare_text(v["BEFORE"], v["AFTER"]) 
            desc.append(obj)
        if len(desc) > 0:
            result["DESCRIPTION"] = desc

        # customize identical result
        if not result:
            result["IDENTICAL"] = True
        ops1 = helpers.operations(api1, "all")
        ops2 = helpers.operations(api2, "all")
        ctx = {
            "APIS": helpers.apis(),
            "API": api1,
            "API1": api1,
            "API2": api2,
            "OP1": opid,
            "OP2": opid,
            "OPERATIONS1": ops1,
            "OPERATIONS2": ops2,
            "RESULT": result,
        }
        return shortcuts.render(req, 'core/compare-ops.html', ctx)


class APIGroups(generic.View):
    """JSON API to list API groups on a specific API version"""

    def get(self, req, **kwargs):
        apiv = kwargs.get("api")
        groups = helpers.groups(apiv)
        return http.JsonResponse({"groups": groups})


class GroupVersions(generic.View):
    """Generic view to list group versions"""

    def get(self, req, **kwargs):
        apiv = kwargs.get("api")
        group = kwargs.get("group")

        versions = helpers.group_versions(apiv, group)
        return http.JsonResponse({"versions": versions})


class Definitions(generic.View):
    """Json API get list definitions"""

    def get(self, req, **kwargs):
        apiv = kwargs.get("api")
        gname = req.GET.get("group")
        gversion = req.GET.get("version")

        defs = helpers.definitions(apiv, gname, gversion)

        return http.JsonResponse({"defs": defs})


class TestJSTree(generic.View):
    """Test view for JStree"""

    def get(self, req, *args, **kwargs):
        data = tmpl.gen_tree("1.13", "core", "v1", "Pod.CREATE")
        ctx = {
            "JSON": data,
        }
        return shortcuts.render(req, 'jstree.html', ctx)


class TestYAML(generic.View):
    """Test view for JStree"""

    def get(self, req, *args, **kwargs):
        data = tmpl.gen_tree("1.13", "core", "v1", "Pod.CREATE")
        ctx = {
            "JSON": data,
        }
        return shortcuts.render(req, 'yaml.html', ctx)
