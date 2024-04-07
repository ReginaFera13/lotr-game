from django.urls import path
from .views import A_game_subquest, All_game_subquests

urlpatterns = [
    path('', All_game_subquests.as_view(), name='all_game_subquests'),
    path('<int:id>/', A_game_subquest.as_view(), name='a_game_subquest'),
]