from django.urls import path
from .views import An_inventory_item, All_inventory_items

urlpatterns = [
    path('', All_inventory_items.as_view(), name='all_inventory_items'),
    path('<int:id>/', An_inventory_item.as_view(), name='an_inventory_item'),
]