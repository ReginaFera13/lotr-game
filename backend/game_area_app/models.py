from django.db import models
from django.core import validators as v
from saved_game_app.models import SavedGame
from dev_area_app.models import DevArea

# Create your models here.
class GameArea(models.Model):
    game_id = models.ForeignKey(SavedGame, on_delete=models.CASCADE)
    area_id = models.ForeignKey(DevArea, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Area: {self.area_id}; Completed: {self.completed}'
    
    def change_completed(self):
        self.completed = not self.completed
        self.save()