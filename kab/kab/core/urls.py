
from django.conf import urls
from django.views import generic

from kab.core import views

urlpatterns = [
    urls.url(r'^$', views.home, name='home'),

    # urls.url(r'^apis/$', views.ListAPIs.as_view(), name='list-apis'),
    urls.url(r'^apis/resources/(?P<version>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
             views.ListResources.as_view(),
             name='list-resources'),
    urls.url(r'^apis/operations/(?P<version>[^\/\s]*)/(?P<group>[^\/\s]*)/$',
             views.ListOperations.as_view(),
             name='list-operations'),
    urls.url(r'^apis/definition/(?P<api>[^\/\s]*)/(?P<group>[^\/\s]*)/(?P<version>[^\/\s]*)/(?P<name>[^\/\s]*)/$',
             views.ViewDefinition.as_view(),
             name='view-definition'),
    urls.url(r'^apis/operation/(?P<api>[^\/\s]*)/(?P<name>[^\/\s]*)/$',
             views.ViewOperation.as_view(),
             name='view-operation'),

    urls.url(r'^apis/compare/$', views.CompareDefinitions.as_view(),
             name='compare-defs'),

    urls.url(r'^api/(?P<api>[^\/\s]*)/groups/$',
             views.APIGroups.as_view(),
             name='list-groups'),
    urls.url(r'^api/(?P<api>[^\/\s]*)/groups/(?P<group>[^\/\s]*)/versions/$',
             views.GroupVersions.as_view(),
             name='list-group-versions'),
    urls.url(r'^api/(?P<api>[^\/\s]*)/definitions/$',
             views.Definitions.as_view(),
             name='list-definitions'),


    urls.url(
        r'^Denied/$',
        generic.TemplateView.as_view(template_name='core/denied.html'),
        name='denied')
]
