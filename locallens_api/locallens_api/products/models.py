from django.conf import settings
from django.db import models


# Create your models here.
class Product(models.Model):
    """Product model for LocalLens API."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to="products/",
        default="products/default.jpg",
        blank=True,
        null=True,
    )
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
