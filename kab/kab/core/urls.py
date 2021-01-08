from django.conf import urls
from django.views import generic

from kab.core import views

urlpatterns = [
    urls.url(r'^$', views.home, name='home'),

    urls.url(r'^apis/apis/$',
             views.ListAPIs.as_view(),
             name='list-apis'),
    urls.url(r'^page/(?P<page>[^\/\s]*)/$',
             views.StaticPage.as_view(),
             name='static-page'),
    urls.url(r'^help-page/(?P<page>[^\/\s]*)/$',
             views.HelpPage.as_view(),
             name='help-page'),
    urls.url(r'^apis/resources/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
             views.ListResources.as_view(),
             name='list-resources'),
    urls.url(r'^apis/definitions/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
             views.ListDefinitions.as_view(),
             name='list-definitions'),
    urls.url(r'^apis/operations/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
             views.ListOperations.as_view(),
             name='list-operations'),
    urls.url(r"^apis/definition/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/"
             r"(?P<version>[^\/\s]*)/(?P<name>[^\/\s]*)/$",
             views.ViewDefinition.as_view(),
             name='view-definition'),

    urls.url(r"^apis/history/def/(?P<group>[^\/\s]*)/"
             r"(?P<version>[^\/\s]*)/(?P<name>[^\/\s]*)/$",
             views.DefinitionHistory.as_view(),
             name='definition-history'),

    urls.url(r'^apis/operation/(?P<api>[^\/\s]*)/(?P<name>[^\/\s]*)/$',
             views.ViewOperation.as_view(),
             name='view-operation'),

    urls.url(r'^apis/switch/(?P<api>[^\/\s]*)/$',
             views.SwitchAPI.as_view(),
             name='switch-apiv'),

    urls.url(r'^apis/compare-defs/$', views.CompareDefinitions.as_view(),
             name='compare-defs'),
    urls.url(r'^apis/compare-ops/$', views.CompareOperations.as_view(),
             name='compare-ops'),

    urls.url(r"^apis/try/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/"
             r"(?P<version>[^\/\s]*)/(?P<name>[^\/\s]*)/$",
             views.TryResource.as_view(),
             name='try-resource'),

    urls.url(r'^apis/export/(?P<fmt>\w+)$',
             views.ExportManifest.as_view(),
             name='export-manifest'),

    urls.url(r'^api/(?P<api>[^\/\s]*)/groups/$',
             views.APIGroups.as_view(),
             name='list-groups-ajax'),
    urls.url(r'^api/(?P<api>[^\/\s]*)/groups/(?P<group>[^\/\s]*)/versions/$',
             views.GroupVersions.as_view(),
             name='list-group-versions-ajax'),
    urls.url(r'^api/(?P<api>[^\/\s]*)/definitions/$',
             views.Definitions.as_view(),
             name='list-definitions-ajax'),
    urls.url(r'^api/(?P<api>[^\/\s]*)/operations/$',
             views.Operations.as_view(),
             name='list-operations-ajax'),

    urls.url(
        r'^Denied/$',
        generic.TemplateView.as_view(template_name='core/denied.html'),
        name='denied')
]
