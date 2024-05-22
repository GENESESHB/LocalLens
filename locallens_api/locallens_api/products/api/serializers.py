from rest_framework import serializers

from locallens_api.products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "user",
            "name",
            "description",
            "price",
            "stock",
            "created_at",
            "updated_at",
        ]
