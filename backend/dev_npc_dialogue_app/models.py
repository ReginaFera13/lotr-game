from django.db import models
from django.core import validators as v
from dev_character_app.models import DevCharacter
from dev_dialogue_options_app.validators import validate_text

# Create your models here.
class DevNPCDialogue(models.Model):
    char_id = models.ForeignKey(DevCharacter, on_delete=models.CASCADE)
    # dialogue for npc
    dialogue_text = models.TextField(validators = [validate_text])
    
    def __str__(self):
        return f'{self.dialogue_text}'
    
    def change_dialogue(self, new_dialogue):
        self.dialogue_text = new_dialogue
        self.save()