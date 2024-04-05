from django.urls import path
from .views import A_dialogue_option, All_dialogue_options

urlpatterns = [
    path('', All_dialogue_options.as_view(), name='all_dialogue_options'),
    path('<int:id>/', A_dialogue_option.as_view(), name='a_dialogue_option'),
]