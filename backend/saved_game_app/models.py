from django.db import models
from django.core import validators as v
from .validators import validate_diff_level
from user_app.models import User

# Create your models here.
class SavedGame(models.Model):
    diff_level = models.CharField(validators = [v.MinLengthValidator(3), v.MaxLengthValidator(7), validate_diff_level])
    scene_state = models.JSONField(blank=True, null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'Game: {self.id}; User: {self.user_id}; Difficulty: {self.diff_level}'
    
    def change_scene_state(self, new_scene_state):
        self.scene_state = new_scene_state
        self.save()