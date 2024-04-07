from django.urls import path
from .views import A_game_dialogue_option, All_game_dialogue_options

urlpatterns = [
    path('', All_game_dialogue_options.as_view(), name='all_game_dialogue_options'),
    path('<int:id>/', A_game_dialogue_option.as_view(), name='a_game_dialogue_option'),
]