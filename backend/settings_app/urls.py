from django.urls import path
from .views import A_setting, All_settings

urlpatterns = [
    path('', All_settings.as_view(), name='all_settings'),
    path('<int:id>/', A_setting.as_view(), name='a_setting'),
]