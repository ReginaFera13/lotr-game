from django.urls import path
from .views import A_quest, All_quests

urlpatterns = [
    path('', All_quests.as_view(), name='all_quests'),
    path('<int:id>/', A_quest.as_view(), name='a_quest'),
]