import uuid
from typing import ClassVar

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class PasswordResetToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.token}"

    def is_valid(self):
        return timezone.now() < self.created_at + timezone.timedelta(hours=48)

    @staticmethod
    def invalidate_previous_tokens(user):
        PasswordResetToken.objects.filter(user=user).delete()


class User(AbstractUser):
    """
    Default custom user model for LocalLens API.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    # First and last name do not cover name patterns around the globe
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore[assignment]
    last_name = None  # type: ignore[assignment]
    email = models.EmailField(_("email address"), unique=True)
    phone = models.CharField(_("Phone number"), blank=True, max_length=15)
    country = models.CharField(_("Country"), max_length=100, blank=True)
    city = models.CharField(_("City"), max_length=100, blank=True)
    profile_picture = models.ImageField(
        _("Profile Picture"),
        upload_to="profile_pictures/",
        blank=True,
        null=True,
    )
    bio = models.TextField(_("Bio"), blank=True)
    date_of_birth = models.DateField(_("Date of Birth"), blank=True, null=True)
    languages_spoken = models.CharField(
        _("Languages Spoken"),
        max_length=255,
        blank=True,
    )
    linkedin_url = models.URLField(_("LinkedIn URL"), blank=True)
    facebook_url = models.URLField(_("Facebook URL"), blank=True)
    instagram_url = models.URLField(_("Instagram URL"), blank=True)
    role = models.CharField(
        _("Role"),
        max_length=50,
        choices=[("freelancer", "Freelancer"), ("client", "Client")],
        default="client",
    )
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects: ClassVar[UserManager] = UserManager()

    def get_absolute_url(self) -> str:
        """Get URL for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"pk": self.id})
