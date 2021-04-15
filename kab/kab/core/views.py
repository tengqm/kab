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

import base64
import collections
import copy
import json
import logging
import os
from urllib import parse
import yaml

from django.conf import settings
from django.core import exceptions as exc
from django import http
from django import shortcuts
from django import template
from django import urls
from django.views import generic
import markdown

from kab import consts
from kab.core import helpers
from kab.core import jsondiff
from kab.core import tmpl

LOG = logging.getLogger(__name__)
MD = markdown.Markdown(
    extensions=["codehilite", "tables", "fenced_code", "toc"])


class Home(generic.View):
    """Generic view for home page"""

    def get(self, req, *qrgs, **kwargs):
        ctx = {
            "FIRST_API": consts.API_VERSIONS[0][0],
            "LAST_API": consts.API_VERSIONS[-1][0],
        }
        return shortcuts.render(req, 'index.html', ctx)


class ListAPIs(generic.View):
    """Generic view to list API versions"""

    def get(self, req, *args, **kwargs):
        result = {}
        for api in consts.API_VERSIONS:
            apiv, rel_date = api[0], api[1]
            result[apiv] = helpers.api_summary(apiv)
            result[apiv]["release_date"] = rel_date
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
        try:
            new_target = urls.reverse(rm.url_name, kwargs=new_kwargs)
        except Exception:
            # redirect to resource list if the reverse parsing failed
            new_kwargs["group"] = "all"
            new_target = urls.reverse("list-resources", kwargs=new_kwargs)

        return http.HttpResponseRedirect(new_target)


class DownloadSpec(generic.View):
    """Generic view for downloading API spec"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.get('api')
        if not apiv:
            apiv = helpers.latest_api()

        fmt = kwargs.get('fmt')
        if not fmt:
            fmt = 'json'

        path = os.path.join(settings.DATA_DIR, apiv, "swagger.json")
        obj = {}
        try:
            with open(path, "r") as f:
                obj = json.load(f)
        except Exception:
            raise exc.SuspiciousOperation("Data is not valid YAML")

        if fmt == "json":
            content_type = "application/json"
            result = json.dumps(obj, indent=2)
        elif fmt == "yaml":
            content_type = "application/yaml"
            yml = yaml.YAML()
            yml.default_flow_style = False
            dumper = helpers.NullStream()
            yml.dump(obj, dumper)
            result = dumper.buf
        else:
            raise exc.SuspiciousOperation("Unsupported format '%s'" % fmt)

        resp = http.HttpResponse(result, content_type=content_type)
        fn = "swagger-{}.{}".format(apiv, fmt)
        resp['Content-Disposition'] = 'attachment; filename="%s"' % fn
        return resp


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
        return shortcuts.render(req, 'core/resource-list.html', ctx)


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

            def_dict = result.get(gv, {})
            def_name = item["name"]
            if "." in item["name"]:
                def_name = item["name"].split(".")[0]

            if def_name not in def_dict:
                def_dict[def_name] = [item["name"]]
            else:
                def_dict[def_name].append(item["name"])

            result[gv] = collections.OrderedDict(sorted(def_dict.items()))

        ctx = {
            "API": apiv,
            "GROUP": gname,
            "DEFINITIONS": collections.OrderedDict(sorted(result.items())),
        }
        return shortcuts.render(req, 'core/def-list.html', ctx)


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
        return shortcuts.render(req, 'core/op-list.html', ctx)


class ViewDefinition(generic.View):
    """Generic view to display a definition"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.pop('api')
        group = kwargs.pop('group')
        version = kwargs.pop('version')
        name = kwargs.pop('name')
        partial = req.GET.get("partial", None)

        definition = helpers.get_definition(apiv, group, version, name)
        name_parts = name.split(".")
        appears_in = helpers.definition_appears_in(apiv, name)
        versions = helpers.definition_versions(name)
        group_fn = helpers.group_full_name(group)

        # filter out current group and version
        found = False
        vlist = []
        for v in versions.get(apiv, []):
            if group == "*" and version == "*":
                found = True
            elif v["group"] == group and v["version"] == version:
                found = True
            elif v["group"] == "" and v["version"] == "version":
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

        navdata = tmpl.gen_tree(apiv, group, version, name)

        kind = name_parts[0]
        is_resource = helpers.is_resource(kind)
        if is_resource:
            operations = helpers.resource_operations(kind, version)
        else:
            operations = []

        ctx = {
            "API": apiv,
            "FULL_GROUP": group_fn,
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
            "JSON": navdata,
        }
        if partial is None:
            template = 'core/def-view.html'
        else:
            template = 'core/def-details.html'

        return shortcuts.render(req, template, ctx)


class DefinitionHistory(generic.View):
    """Generic view to display a definition"""

    def get(self, req, *args, **kwargs):
        group = kwargs.pop('group')
        version = kwargs.pop('version')
        name = kwargs.pop('name')

        fn = helpers.get_definition_name(group, version, name)
        group_fn = helpers.group_full_name(group)
        result = jsondiff.history("defs", fn)

        if result is None:
            # definition is not found or identical
            ctx = {
                "TYPE": "Definition",
                "GROUP": group,
                "VERSION": version,
                "NAME": name,
            }
            return shortcuts.render(req, 'notfound.html', ctx)

        ctx = {
            "GROUP": group,
            "FULL_GROUP": group_fn,
            "VERSION": version,
            "NAME": name,
            "DIFFDATA": result,
            "START_API": consts.API_VERSIONS[0][0],
            "END_API": consts.API_VERSIONS[-1][0],
        }
        template = 'core/def-history.html'

        return shortcuts.render(req, template, ctx)


class ViewOperation(generic.View):
    """Generic view to display an operation"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.pop('api')
        name = kwargs.pop('name')
        op = helpers.get_operation(apiv, name)
        if not op:
            raise exc.SuspiciousOperation("Unknown operation")
        params = helpers.parse_params(apiv, op["spec"])
        gv_list = op["group_version"].split("/")
        group_name = gv_list[0]
        group_version = "*" if len(gv_list) == 1 else gv_list[1]
        related = helpers.related_ops(name, op["target"], group_version)
        ctx = {
            "API": apiv,
            "OP": op["spec"],
            "GROUP_NAME": group_name,
            "GROUP_VERSION": group_version,
            'PATH': [p for p in params if p['in'] == 'path'],
            'QUERY': [p for p in params if p['in'] == 'query'],
            'BODY': [p for p in params if p['in'] == 'body'],
            "VERSIONS": op["versions"],
            "RELATED": related,
        }
        return shortcuts.render(req, 'core/op-view.html', ctx)


class OperationHistory(generic.View):
    """Generic view to display an operation"""

    def get(self, req, *args, **kwargs):
        name = kwargs.pop('name')

        result = jsondiff.history("ops", name + ".json")
        ctx = {
            "NAME": name,
            "DIFFDATA": result,
            "START_API": consts.API_VERSIONS[0][0],
            "END_API": consts.API_VERSIONS[-1][0],
        }
        return shortcuts.render(req, 'core/op-history.html', ctx)


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
        grp1 = req.POST.get('group1')
        grp2 = req.POST.get('group2', grp1)
        ver1 = req.POST.get('version1')
        ver2 = req.POST.get('version2', ver1)
        opid1 = req.POST.get("op1")
        opid2 = req.POST.get("op2", opid1)

        result = jsondiff.compare_ops([api1, api2], [opid1, opid2])

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
        grps1 = helpers.groups(api1)
        grps2 = helpers.groups(api2)
        vers1 = helpers.group_versions(api1, grp1)
        vers2 = helpers.group_versions(api2, grp2)
        ops1 = helpers.operations(api1, grp1 + "/" + ver1)
        ops2 = helpers.operations(api2, grp2 + "/" + ver2)

        ctx = {
            "APIS": helpers.apis(),
            "API": api1,
            "API1": api1,
            "API2": api2,
            "GRP1": grp1,
            "GRP2": grp2,
            "VER1": ver1,
            "VER2": ver2,
            "OP1": opid1,
            "OP2": opid2,
            "GROUPS1": grps1,
            "GROUPS2": grps2,
            "VERSIONS1": vers1,
            "VERSIONS2": vers2,
            "OPERATIONS1": ops1.get(grp1 + "/" + ver1, []),
            "OPERATIONS2": ops2.get(grp2 + "/" + ver2, []),
            "RESULT": result,
        }
        return shortcuts.render(req, 'core/compare-ops.html', ctx)


class APIGroups(generic.View):
    """JSON API to list API groups on a specific API version"""

    def get(self, req, **kwargs):
        apiv = kwargs.get("api")
        groups = helpers.groups(apiv)
        return http.JsonResponse({"groups": groups})


class APIHistory(generic.View):
    """Generic view to display an operation"""

    def get(self, req, *args, **kwargs):
        version = kwargs.pop('version')
        result = jsondiff.api_history(version)
        ctx = {
            "DATA": result,
        }
        return shortcuts.render(req, 'core/full-history.html', ctx)


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


class Operations(generic.View):
    """Json API get list operations"""

    def get(self, req, **kwargs):
        apiv = kwargs.get("api")
        gname = req.GET.get("group")
        gversion = req.GET.get("version")

        ops = helpers.operations(apiv, "/".join([gname, gversion]))

        return http.JsonResponse({"ops": ops})


class TryResource(generic.View):
    """Generic view to try a resource"""

    def get(self, req, *args, **kwargs):
        apiv = kwargs.pop('api')
        group = kwargs.pop('group')
        version = kwargs.pop('version')
        name = kwargs.pop('name')
        name_parts = name.split(".")

        kind = name_parts[0]
        # TODO: only process CREATE and UPDATE variants
        is_resource = helpers.is_resource(kind)
        # TODO: pop up warning if not resource

        schema = helpers.get_definition(apiv, group, version, name, True)
        json_obj = helpers.empty_json(schema)
        yaml_str = yaml.dump(json_obj, indent=2, default_flow_style=False)
        yaml_str = yaml_str.replace("\r", "\n")
        ctx = {
            "API": apiv,
            "GROUP": group,
            "VERSION": version,
            "KIND": kind,
            "NAME": name,
            "IS_RESOURCE": is_resource,
            "SCHEMA": schema,
            "OBJECT": yaml_str,
        }
        return shortcuts.render(req, 'core/try-yaml.html', ctx)


class ExportManifest(generic.View):

    def get(self, req, *args, **kwargs):
        kind = req.GET.get("kind", None)
        if not kind:
            raise exc.SuspiciousOperation("Unknown resource kind")

        raw_data = req.GET.get("data", None)
        if raw_data:
            try:
                data = base64.b64decode(raw_data).decode()
            except Exception as ex:
                err = "Data is not valid: %s" % str(ex)
                raise exc.SuspiciousOperation(err)
        else:
            data = ""

        try:
            obj = yaml.load(data)
        except Exception:
            raise exc.SuspiciousOperation("Data is not valid YAML")

        fmt = kwargs.get('fmt', 'yaml').lower()
        if fmt == "json":
            content_type = "application/json"
            result = json.dumps(obj, indent=2)
        elif fmt == "yaml":
            content_type = "application/yaml"
            yml = yaml.YAML()
            yml.default_flow_style = False
            dumper = helpers.NullStream()
            yml.dump(obj, dumper)
            result = dumper.buf
        else:
            raise exc.SuspiciousOperation("Unsupported format '%s'" % fmt)

        resp = http.HttpResponse(result, content_type=content_type)
        fn = "{}-sample.{}".format(kind, fmt)
        resp['Content-Disposition'] = 'attachment; filename="%s"' % fn
        return resp


class StaticPage(generic.View):

    def get(self, req, *args, **kwargs):
        page = kwargs.get("page", "")
        if page == "":
            target = urls.reverse("list-apis")
            return http.HttpResponseRedirect(target)

        path = os.path.join(settings.BASE_DIR, "kab", "templates", "static",
                            page + ".md")
        if not os.path.exists(path) or not os.path.isfile(path):
            target = urls.reverse("list-apis")
            return http.HttpResponseRedirect(target)

        data = ""
        try:
            with open(path, "r") as f:
                data = f.read()
        except Exception as ex:
            LOG.warning("Failed parsing markdown %s: %s", path, str(ex))
            data = ""

        ctx = template.Context({"API": consts.API_VERSIONS[-1][0]})
        data = template.Template(data).render(ctx)
        content = MD.reset().convert(data)
        ctx = {
            "TITLE": page,
            "CONTENT": content,
        }
        return shortcuts.render(req, 'core/static-container.html', ctx)


class HelpPage(generic.View):

    def get(self, req, *args, **kwargs):
        page = kwargs.get("page", "")
        if page == "":
            raise exc.SuspiciousOperation("Invalid page specified")

        path = os.path.join(settings.BASE_DIR, "kab", "templates", "static",
                            page + ".md")
        if not os.path.exists(path) or not os.path.isfile(path):
            raise exc.SuspiciousOperation("Page not found")

        content = ""
        try:
            with open(path, "r") as f:
                content = MD.reset().convert(f.read())
        except Exception as ex:
            LOG.warning("Failed parsing markdown %s: %s", path, str(ex))
            content = ""

        ctx = {
            "CONTENT": content,
        }
        return shortcuts.render(req, 'core/help-page.html', ctx)
