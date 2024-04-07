from django.urls import path
from .views import A_game_stat, All_game_stats

urlpatterns = [
    path('', All_game_stats.as_view(), name='all_game_stats'),
    path('<int:id>/', A_game_stat.as_view(), name='a_game_stat'),
]