from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
from .validators import validate_display_name
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.apps import apps

class User(AbstractUser):
    email = models.EmailField(unique=True)
    display_name = models.CharField(unique=True, validators=[v.MinLengthValidator(5), v.MaxLengthValidator(20), validate_display_name])
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

# Define the signal handler function to create GameStats objects for a new user
@receiver(post_save, sender=User)
def create_game_stats(sender, instance, created, **kwargs):
    if created:
        GameStats = apps.get_model('game_stats_app', 'GameStats')
        # Create GameStats objects for each difficulty level
        GameStats.objects.create(user_id=instance, diff_level='easy')
        GameStats.objects.create(user_id=instance, diff_level='medium')
        GameStats.objects.create(user_id=instance, diff_level='hard')
