"""Common template processors"""

import pkg_resources

from kab import consts


def global_context(request):
    return {
        'API_VERSIONS': consts.API_VERSIONS,
        "kab_version": pkg_resources.require("KAB")[0].version,
    }
