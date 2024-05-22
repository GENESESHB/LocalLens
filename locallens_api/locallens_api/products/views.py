# shop/views.py

from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.views.generic import DeleteView
from django.views.generic import DetailView
from django.views.generic import ListView
from django.views.generic import UpdateView

from .models import Product


class ProductListView(ListView):
    model = Product
    template_name = "shop/product_list.html"
    context_object_name = "products"


class ProductDetailView(DetailView):
    model = Product
    template_name = "shop/product_detail.html"
    context_object_name = "product"


class ProductCreateView(CreateView):
    model = Product
    template_name = "shop/product_form.html"
    fields = ["user", "name", "description", "price", "stock"]


class ProductUpdateView(UpdateView):
    model = Product
    template_name = "shop/product_form.html"
    fields = ["user", "name", "description", "price", "stock"]


class ProductDeleteView(DeleteView):
    model = Product
    template_name = "shop/product_confirm_delete.html"
    success_url = reverse_lazy("product_list")
