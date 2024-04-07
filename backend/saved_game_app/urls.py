from django.urls import path
from .views import A_saved_game, All_saved_games

urlpatterns = [
    path('', All_saved_games.as_view(), name='all_saved_games'),
    path('<int:id>/', A_saved_game.as_view(), name='a_saved_game'),
]