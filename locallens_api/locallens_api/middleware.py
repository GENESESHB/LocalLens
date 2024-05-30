# locallens_api/middleware.py
import re

from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class DisableSessionMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if re.match(settings.CORS_URLS_REGEX, request.path):
            request.session.save = lambda: None
            request.session.modified = False
