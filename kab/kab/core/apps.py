import logging

from django import apps

LOG = logging.getLogger(__name__)


class Config(apps.AppConfig):
    name = "kab.core"

    def ready(self):
        from kab.core import helpers
        helpers.init("data")
