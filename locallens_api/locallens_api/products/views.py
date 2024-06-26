import time

from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .api.serializers import ProductSerializer
from .api.serializers import ProductUserSerializer
from .models import Product
from .permissions import IsOwner


class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductUserSerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def post(self, request, *args, **kwargs):
        data = request.data
        if "image" not in request.FILES:
            return Response(
                {"message": "You must upload an image to create a product."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if request.user.is_anonymous:
            return Response(
                {"message": "You must be logged in to create a product."},
                status=status.HTTP_403_FORBIDDEN,
            )
        product = {
            "user": request.user.id,
            "name": data.get("name"),
            "image": request.FILES["image"],
            "heading": data.get("heading"),
            "description": data.get("description"),
            "price": data.get("price"),
            "stock": data.get("stock"),
            "created_at": time.strftime("%Y-%m-%d %H:%M:%S"),
            "updated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        }
        product_serializer = ProductSerializer(data=product)
        product_serializer.is_valid(raise_exception=True)
        product_serializer.save()
        return Response(product_serializer.data, status=status.HTTP_201_CREATED)


class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductUserSerializer

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            self.permission_classes = [IsAuthenticated, IsOwner]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()
