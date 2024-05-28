from http import HTTPStatus

import requests
from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse
from django.views import View
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from locallens_api.users.models import PasswordResetToken
from locallens_api.users.models import User

from .permissions import IsSuperuserOrSelf
from .serializers import PasswordResetConfirmSerializer
from .serializers import PasswordResetRequestSerializer
from .serializers import UserSerializer

REQUEST_TIMEOUT = 10


class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            user = User.objects.get(email=email)
            PasswordResetToken.invalidate_previous_tokens(user)
            token = PasswordResetToken.objects.create(user=user)

            reset_url = f"{settings.REACT_APP_URL}/Reset/{token.token}/"
            send_mail(
                "Password Reset Request",
                f"Click the link to reset your password: {reset_url}",
                "locallens_ma@outlook.com",
                [email],
                fail_silently=False,
            )

            return Response(
                {"detail": "Password reset link has been sent to your Email."},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"detail": "Password has been reset."},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
