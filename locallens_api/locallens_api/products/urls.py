from django.urls import path

from .api.views import ProductCreateAPIView
from .api.views import ProductRetrieveUpdateDestroyAPIView

urlpatterns = [
    path("", ProductCreateAPIView.as_view(), name="product_list_create"),
    path(
        "<int:pk>/",
        ProductRetrieveUpdateDestroyAPIView.as_view(),
        name="product_retrieve_update_destroy",
    ),
]
