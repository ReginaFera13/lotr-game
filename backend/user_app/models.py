from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
from .validators import validate_display_name

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(unique=True, validators = [v.MinLengthValidator(5), v.MaxLengthValidator(20), validate_display_name])
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]