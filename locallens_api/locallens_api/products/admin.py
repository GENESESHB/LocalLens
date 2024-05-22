from django.contrib import admin
from .models import Product

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'price', 'stock', 'created_at', 'updated_at')
    search_fields = ('name', 'description', 'user__email')