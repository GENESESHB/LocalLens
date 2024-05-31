from django.conf import settings
from django.db import models
from markdownfield.models import MarkdownField
from markdownfield.models import RenderedMarkdownField
from markdownfield.validators import VALIDATOR_STANDARD


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
    heading = models.CharField(max_length=100, blank=True)
    description = MarkdownField(
        rendered_field="description_rendered",
        validator=VALIDATOR_STANDARD,
    )
    description_rendered = RenderedMarkdownField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
