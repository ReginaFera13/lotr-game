from django.urls import path
from .views import A_character, All_characters

urlpatterns = [
    path('', All_characters.as_view(), name='all_characters'),
    path('<int:id>/', A_character.as_view(), name='an_character'),
]