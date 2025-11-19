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

from django.conf.urls.i18n import i18n_patterns
from django import urls
from django.urls import path
from django.urls import re_path
from django.views import generic

from kab.core import views

urlpatterns = i18n_patterns(
    # path('admin/', admin.site.urls),
    # re_path(r'', urls.include('kab.core.urls'))
    path(
        'Denied/',
        generic.TemplateView.as_view(template_name='core/denied.html'),
        name='denied'),
)

urlpatterns += i18n_patterns(
    path('', views.Home.as_view(), name='home'),

    re_path(r'^page/(?P<page>[^\/\s]*)/$',
            views.StaticPage.as_view(),
            name='static-page'),
    re_path(r'^help-page/(?P<page>[^\/\s]*)/$',
            views.HelpPage.as_view(),
            name='help-page'),
)

urlpatterns += i18n_patterns(
    path('apis/apis/',
            views.ListAPIs.as_view(),
            name='list-apis'),
    re_path(r'^apis/apis/download/(?P<api>[^\n\s]*)/(?P<fmt>\w+)/$',
            views.DownloadSpec.as_view(),
            name='download-spec'),
    re_path(r'^apis/groups/(?P<api>[^\/\s]*)/$',
            views.ListGroups.as_view(),
            name='list-groups'),

    re_path(r'^apis/resources/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
            views.ListResources.as_view(),
            name='list-resources'),

    re_path(r'^apis/definitions/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
            views.ListDefinitions.as_view(),
            name='list-definitions'),
    re_path(r"^apis/definition/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/"
            r"(?P<version>[^\/\s]*)/(?P<name>[^\/\s]*)/$",
            views.ViewDefinition.as_view(),
            name='view-definition'),
    re_path(r"^apis/history/def/(?P<group>[^\/\s]*)/"
            r"(?P<version>[^\/\s]*)/(?P<name>[^\/\s]*)/$",
            views.DefinitionHistory.as_view(),
            name='definition-history'),

    re_path(r'^apis/operations/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
            views.ListOperations.as_view(),
            name='list-operations'),
    re_path(r'^apis/operation/(?P<api>[^\/\s]*)/(?P<name>[^\/\s]*)/$',
            views.ViewOperation.as_view(),
            name='view-operation'),
    re_path(r"^apis/history/op/(?P<name>[^\/\s]*)/$",
            views.OperationHistory.as_view(),
            name='op-history'),

    re_path(r"^apis/history/api/(?P<version>[^\/\s]*)/$",
            views.APIHistory.as_view(),
            name='full-history'),

    re_path(r"^apis/features/(?P<api>[^\/\s]*)/$",
            views.Features.as_view(),
            name='feature-gates'),

    re_path(r'^apis/lang/(?P<lang>[^\/\s]*)/$',
            views.SwitchLang.as_view(),
            name='switch-lang'),

    re_path(r'^apis/switch/(?P<api>[^\/\s]*)/$',
            views.SwitchAPI.as_view(),
            name='switch-apiv'),

    re_path(r'^apis/compare-defs/$', views.CompareDefinitions.as_view(),
            name='compare-defs'),
    re_path(r'^apis/compare-ops/$', views.CompareOperations.as_view(),
            name='compare-ops'),

    re_path(r"^apis/try/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/"
            r"(?P<version>[^\/\s]*)/(?P<name>[^\/\s]*)/$",
            views.TryResource.as_view(),
            name='try-resource'),

    re_path(r'^apis/export/(?P<fmt>\w+)$',
            views.ExportManifest.as_view(),
            name='export-manifest'),
)

urlpatterns += i18n_patterns(
    re_path(r'^api/(?P<api>[^\/\s]*)/groups/$',
            views.APIGroups.as_view(),
            name='list-groups-ajax'),
    re_path(r'^api/(?P<api>[^\/\s]*)/groups/(?P<group>[^\/\s]*)/versions/$',
            views.GroupVersions.as_view(),
            name='list-group-versions-ajax'),
    re_path(r'^api/(?P<api>[^\/\s]*)/definitions/$',
            views.Definitions.as_view(),
            name='list-definitions-ajax'),
    re_path(r'^api/(?P<api>[^\/\s]*)/operations/$',
            views.Operations.as_view(),
            name='list-operations-ajax'),
)


