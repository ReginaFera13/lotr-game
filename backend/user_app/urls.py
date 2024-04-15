from django.urls import path
from .views import Register_admin, Register, Login, Logout, Info, DeleteUser
from lotr_proj.settings import env

urlpatterns = [
    path("", Info.as_view(), name="info"),
    path("register/", Register.as_view(), name="register"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    path("delete_user/", DeleteUser.as_view(), name="delete_user"),
    path(f"{env.get('REGISTER_ADMIN')}", Register_admin.as_view(), name="register_admin")
]