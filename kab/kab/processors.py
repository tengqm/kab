"""Common template processors"""

import pkg_resources

from kab import consts


def global_context(request):
    return {
        "APIS": [v[0] for v in consts.API_VERSIONS],
        "LATEST_API": consts.API_VERSIONS[-1][0],
        "kab_version": pkg_resources.require("KAB")[0].version,
    }
