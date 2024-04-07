from django.urls import path
from .views import A_game_quest, All_game_quests

urlpatterns = [
    path('', All_game_quests.as_view(), name='all_game_quests'),
    path('<int:id>/', A_game_quest.as_view(), name='a_game_quest'),
]