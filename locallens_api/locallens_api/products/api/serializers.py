from rest_framework import serializers

from locallens_api.products.models import Product
from locallens_api.users.api.serializers import UserProductSerializer


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "user",
            "name",
            "image",
            "description",
            "price",
            "stock",
            "created_at",
            "updated_at",
        ]


class ProductUserSerializer(serializers.ModelSerializer):
    user = UserProductSerializer()

    class Meta:
        model = Product
        fields = [
            "id",
            "user",
            "name",
            "image",
            "description",
            "price",
            "stock",
            "created_at",
            "updated_at",
        ]
