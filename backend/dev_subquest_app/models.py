from django.db import models
from django.core import validators as v
from dev_dialogue_options_app.validators import validate_text
from dev_quest_app.models import DevQuest

# Create your models here.
class DevSubquest(models.Model):
    quest_id = models.ForeignKey(DevQuest, on_delete=models.CASCADE)
    descrip = models.TextField(validators = [validate_text])
    order = models.BigIntegerField()
    
    def __str__(self):
        return f'{self.descrip}'
    
    def change_descrip(self, new_descrip):
        self.descrip = new_descrip
        self.save()
    
    def change_order(self, new_order):
        self.order = new_order
        self.save()