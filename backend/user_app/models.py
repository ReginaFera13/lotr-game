from django.db import models
from django.contrib.auth.models import AbstractUser
from .validators import validate_display_name

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField()
    USERNAME_FIELD='display_name'
    REQUIRED_FIELDS=[]