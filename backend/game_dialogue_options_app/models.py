from django.db import models
from django.core import validators as v
from dev_dialogue_options_app.models import DevDialogueOptions

# Create your models here.
class GameDialogueOptions(models.Model):
    dialogue_id = models.ForeignKey(DevDialogueOptions, on_delete=models.CASCADE)
    repeatable = models.BooleanField(default=False)
    visited = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Dialougue: {self.dialogue_id}; Visited: {self.visited}'
    
    def change_repeatable(self):
        self.repeatable = not self.repeatable
        self.save()
    
    def change_visited(self):
        self.visited = not self.visited
        self.save()