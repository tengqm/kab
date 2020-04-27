import logging
import traceback

from django.core.management.color import color_style


class DjangoColorsFormatter(logging.Formatter):

    def __init__(self, *args, **kwargs):
        super(DjangoColorsFormatter, self).__init__(*args, **kwargs)
        self.style = self.configure_style(color_style())

    def configure_style(self, style):
        style.DEBUG = style.HTTP_NOT_MODIFIED
        style.INFO = style.HTTP_INFO
        style.WARNING = style.HTTP_NOT_FOUND
        style.ERROR = style.ERROR
        style.CRITICAL = style.HTTP_SERVER_ERROR
        return style

    def format(self, record):
        message = logging.Formatter.format(self, record)
        colorizer = getattr(self.style, record.levelname,
                            self.style.HTTP_SUCCESS)
        return colorizer(message)


class StackInfoHandler(logging.StreamHandler):

    trim = 5

    def emit(self, record):
        super(StackInfoHandler, self).emit(record)

        stack = ''.join(str(row)
                        for row in traceback.format_stack()[:-self.trim])
        self.stream.write(stack)
