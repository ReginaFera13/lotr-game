from django.urls import path
from .views import A_subquest, All_subquests

urlpatterns = [
    path('', All_subquests.as_view(), name='all_subquests'),
    path('<int:id>/', A_subquest.as_view(), name='a_subquest'),
]