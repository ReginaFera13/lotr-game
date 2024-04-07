from django.urls import path
from .views import A_game_character, All_game_characters

urlpatterns = [
    path('', All_game_characters.as_view(), name='all_game_characters'),
    path('<int:id>/', A_game_character.as_view(), name='a_game_character'),
]