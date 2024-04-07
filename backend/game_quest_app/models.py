from django.db import models
from django.core import validators as v
from dev_quest_app.models import DevQuest
from saved_game_app.models import SavedGame

# Create your models here.
class GameQuest(models.Model):
    game_id = models.ForeignKey(SavedGame, on_delete=models.CASCADE)
    quest_id = models.ForeignKey(DevQuest, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Quest: {self.quest_id}; Completed: {self.completed}'
    
    def change_completed(self):
        self.completed = not self.completed
        self.save()