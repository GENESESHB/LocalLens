import pytest
from rest_framework.test import APIRequestFactory

from locallens_api.users.api.views import UserViewSet
from locallens_api.users.models import User


class TestUserViewSet:
    @pytest.fixture()
    def api_rf(self) -> APIRequestFactory:
        return APIRequestFactory()

    def test_get_queryset(self, user: User, api_rf: APIRequestFactory):
        view = UserViewSet()
        request = api_rf.get("/fake-url/")
        request.user = user

        view.request = request

        assert user in view.get_queryset()

    def test_me(self, user: User, api_rf: APIRequestFactory):
        view = UserViewSet()
        request = api_rf.get("/fake-url/")
        request.user = user

        view.request = request

        response = view.me(request)  # type: ignore[call-arg, arg-type, misc]

        assert response.data == {
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "country": user.country,
            "city": user.city,
            "profile_picture": user.profile_picture,
            "bio": user.bio,
            "date_of_birth": user.date_of_birth,
            "languages_spoken": user.languages_spoken,
            "linkedin_url": user.linkedin_url,
            "facebook_url": user.facebook_url,
            "instagram_url": user.instagram_url,
            "role": user.role,
        }
