"""Common template processors"""

import pkg_resources

from kab import consts


def global_context(request):
    return {
        "APIS": consts.API_VERSIONS,
        "LATEST_API": consts.API_VERSIONS[-1],
        "kab_version": pkg_resources.require("KAB")[0].version,
    }
