# shop/views.py

from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Product

class ProductListView(ListView):
    model = Product
    template_name = 'shop/product_list.html'
    context_object_name = 'products'

class ProductDetailView(DetailView):
    model = Product
    template_name = 'shop/product_detail.html'
    context_object_name = 'product'

class ProductCreateView(CreateView):
    model = Product
    template_name = 'shop/product_form.html'
    fields = ['user', 'name', 'description', 'price', 'stock']

class ProductUpdateView(UpdateView):
    model = Product
    template_name = 'shop/product_form.html'
    fields = ['user', 'name', 'description', 'price', 'stock']

class ProductDeleteView(DeleteView):
    model = Product
    template_name = 'shop/product_confirm_delete.html'
    success_url = reverse_lazy('product_list')
