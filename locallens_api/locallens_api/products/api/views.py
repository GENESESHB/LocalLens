# shop/views.py

from rest_framework import generics

from locallens_api.products.models import Product

from .serializers import ProductSerializer
from .serializers import ProductUserSerializer


class ProductCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductUserSerializer
