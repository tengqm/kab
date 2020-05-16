"""openapiviewer URL Configuration
"""
from django.contrib import admin
from django.urls import path
from django.conf import urls

urlpatterns = [
    # path('admin/', admin.site.urls),
    urls.url(r'', urls.include('kab.core.urls'))
]
