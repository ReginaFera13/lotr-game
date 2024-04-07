from django.db import models
from django.core import validators as v
from saved_game_app.models import SavedGame
from dev_subquest_app.models import DevSubquest

# Create your models here.
class GameSubquest(models.Model):
    game_id = models.ForeignKey(SavedGame, on_delete=models.CASCADE)
    subquest_id = models.ForeignKey(DevSubquest, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Subquest: {self.subquest_id}; Completed: {self.completed}'
    
    def change_completed(self):
        self.completed = not self.completed
        self.save()