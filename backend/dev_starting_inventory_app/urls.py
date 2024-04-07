from django.urls import path
from .views import A_characters_starting_inventory, All_characters_starting_inventory

urlpatterns = [
    path('', All_characters_starting_inventory.as_view(), name='all_characters_starting_inventory'),
    path('<int:id>/', A_characters_starting_inventory.as_view(), name='a_characters_starting_inventory'),
]