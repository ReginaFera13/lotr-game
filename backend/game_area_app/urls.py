from django.urls import path
from .views import A_game_area, All_game_areas

urlpatterns = [
    path('', All_game_areas.as_view(), name='all_game_areas'),
    path('<int:id>/', A_game_area.as_view(), name='a_game_area'),
]