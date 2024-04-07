from django.urls import path
from .views import The_one_api

urlpatterns = [
    path('', The_one_api.as_view(), name='the_one_api'),
]