from django.db import models
from django.core import validators as v
from .validators import validate_text
from dev_npc_dialogue_app.models import DevNPCDialogue

# Create your models here.
class DevDialogueOptions(models.Model):
    # dialogue options for player
    dialogue_text = models.TextField(validators = [validate_text])
    # which dialogue the player is responding to
    npc_dialogue_id = models.ForeignKey(DevNPCDialogue, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.dialogue_text}'
    
    def change_dialogue(self, new_dialogue):
        self.dialogue_text = new_dialogue
        self.save()
        
    def change_npc_dialogue(self, new_npc_dialogue):
        self.npc_dialogue_id = new_npc_dialogue
        self.save()