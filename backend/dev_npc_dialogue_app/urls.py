from django.urls import path
from .views import A_npc_dialogue, All_npc_dialogue

urlpatterns = [
    path('', All_npc_dialogue.as_view(), name='all_npc_dialogue'),
    path('<int:id>/', A_npc_dialogue.as_view(), name='a_npc_dialogue'),
]