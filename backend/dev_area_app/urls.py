from django.urls import path
from .views import All_areas, An_area

urlpatterns = [
    path('', All_areas.as_view(), name='all_areas'),
    path('<int:id>/', An_area.as_view(), name='an_area'),
]