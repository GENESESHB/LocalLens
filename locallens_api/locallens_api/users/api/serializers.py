from rest_framework import serializers

from locallens_api.users.models import PasswordResetToken
from locallens_api.users.models import User


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            msg = "User with this email does not exist."
            raise serializers.ValidationError(msg)
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    new_password = serializers.CharField(write_only=True)

    def validate_token(self, value):
        try:
            reset_token = PasswordResetToken.objects.get(token=value)
        except PasswordResetToken.DoesNotExist as err:
            msg = "Invalid token."
            raise serializers.ValidationError(msg) from err

        if not reset_token.is_valid():
            msg = "Expired token."
            raise serializers.ValidationError(msg)

        return value

    def save(self):
        token = self.validated_data["token"]
        new_password = self.validated_data["new_password"]

        reset_token = PasswordResetToken.objects.get(token=token)
        user = reset_token.user
        user.set_password(new_password)
        user.save()
        reset_token.delete()


class UserSerializer(serializers.ModelSerializer[User]):
    class Meta:
        model = User
        fields = [
            "name",
            "email",
            "phone",
            "country",
            "city",
            "profile_picture",
            "bio",
            "date_of_birth",
            "languages_spoken",
            "linkedin_url",
            "facebook_url",
            "instagram_url",
            "role",
        ]
