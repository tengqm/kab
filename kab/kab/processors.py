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

"""Common template processors"""

import pkg_resources

from kab import consts


def global_context(request):
    return {
        "APIS": [v[0] for v in consts.API_VERSIONS],
        "LATEST_API": consts.API_VERSIONS[-1][0],
        "kab_version": pkg_resources.require("KAB")[0].version,
    }
