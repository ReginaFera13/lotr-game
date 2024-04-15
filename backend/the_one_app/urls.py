from django.urls import path
from .views import The_one_api_all, The_one_api_char

urlpatterns = [
    path('', The_one_api_all.as_view(), name='the_one_api_all'),
    path('<str:id>/', The_one_api_char.as_view(), name='the_one_api_char'),
]