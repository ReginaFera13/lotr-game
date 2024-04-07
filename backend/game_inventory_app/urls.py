from django.urls import path
from .views import A_game_character_inventory, All_game_character_inventories

urlpatterns = [
    path('', All_game_character_inventories.as_view(), name='all_game_character_inventories'),
    path('<int:id>/', A_game_character_inventory.as_view(), name='a_game_character_inventory'),
]