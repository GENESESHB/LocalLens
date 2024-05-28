from http import HTTPStatus

import requests
from django.http import HttpResponse
from django.views import View
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from locallens_api.users.models import User

from .permissions import IsSuperuserOrSelf
from .serializers import UserSerializer

REQUEST_TIMEOUT = 10


class AccountConfirmEmailView(View):
    template_name = "account/email_confirm.html"

    def get(self, request, key):
        verify_url = (
            f"{request.scheme}://{request.get_host()}/auth/registration/verify-email/"
        )
        try:
            response = requests.post(
                verify_url,
                data={"key": key},
                timeout=REQUEST_TIMEOUT,
            )
            if response.status_code == HTTPStatus.OK:
                return HttpResponse(
                    "Email verified successfully, You can go back to the website.",
                )
            return HttpResponse(
                "Email verification failed.",
                status=HTTPStatus.BAD_REQUEST,
            )
        except requests.RequestException as e:
            return HttpResponse(
                f"An error occurred: {e}",
                status=HTTPStatus.INTERNAL_SERVER_ERROR,
            )


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "pk"
    permission_classes = [IsAuthenticated, IsSuperuserOrSelf]

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)
