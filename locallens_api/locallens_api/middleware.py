# locallens_api/middleware.py
import re

from django.conf import settings
from django.utils.deprecation import MiddlewareMixin


class DisableSessionMiddleware(MiddlewareMixin):
    class DisabledSession:
        def save(self, *args, **kwargs):
            pass

        def cycle_key(self):
            pass

        def __setitem__(self, key, value):
            pass

        def __getitem__(self, key):
            raise KeyError

        def __delitem__(self, key):
            pass

        def __contains__(self, key):
            return False

    def process_request(self, request):
        if re.match(settings.CORS_URLS_REGEX, request.path):
            request.session = self.DisabledSession()
