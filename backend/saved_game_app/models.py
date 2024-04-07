from django.db import models
from django.core import validators as v
from .validators import validate_diff_level
from user_app.models import User

# Create your models here.
class SavedGame(models.Model):
    diff_level = models.CharField(validators = [v.MinLengthValidator(4), v.MaxLengthValidator(6), validate_diff_level])
    save_date = models.TimeField()
    scene_state = models.JSONField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'User: {self.user_id}; Difficulty: {self.diff_level}; Last Saved: {self.save_date}'
    
    def change_save_date(self, new_save_date):
        self.save_date = new_save_date
        self.save()
    
    def change_scene_state(self, new_scene_state):
        self.scene_state = new_scene_state
        self.save()