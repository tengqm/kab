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

import logging

from django import apps

LOG = logging.getLogger(__name__)


class Config(apps.AppConfig):
    name = "kab.core"

    def ready(self):
        # Initialize data directory so that the helpers tool can be invoked
        # from outside the django context
        from kab.core import helpers

        helpers.init("data")
