from django.urls import path
from .views import Register_admin, Register, Log_in, Log_out, Info
from lotr_proj.settings import env

urlpatterns = [
    path("", Info.as_view(), name="info"),
    path("register/", Register.as_view(), name="register"),
    path("login/", Log_in.as_view(), name="login"),
    path("logout/", Log_out.as_view(), name="logout"),
    path(f"{env.get('REGISTER_ADMIN')}", Register_admin.as_view(), name="register_admin")
]