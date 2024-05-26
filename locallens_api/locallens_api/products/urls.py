from django.urls import path

from .views import ProductListCreateAPIView
from .views import ProductRetrieveUpdateDestroyAPIView

urlpatterns = [
    path("", ProductListCreateAPIView.as_view(), name="product_list_create"),
    path(
        "<int:pk>/",
        ProductRetrieveUpdateDestroyAPIView.as_view(),
        name="product_retrieve_update_destroy",
    ),
]
