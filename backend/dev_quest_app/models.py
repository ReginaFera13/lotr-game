from django.db import models
from django.core import validators as v
from dev_dialogue_options_app.validators import validate_text
from dev_area_app.validators import validate_name
from dev_area_app.models import DevArea

# Create your models here.
class DevQuest(models.Model):
    area_id = models.ForeignKey(DevArea, on_delete=models.CASCADE)
    name = models.CharField(unique=True, validators = [v.MinLengthValidator(4), v.MaxLengthValidator(50), validate_name])
    descrip = models.TextField(validators = [v.MinLengthValidator(4), validate_text])
    order = models.BigIntegerField()
    
    def __str__(self):
        return f'{self.name}'
    
    def change_area(self, new_area):
        self.area_id = new_area
        self.save()
    
    def change_name(self, new_name):
        self.name = new_name
        self.save()
    
    def change_descrip(self, new_descrip):
        self.descrip = new_descrip
        self.save()
        
    def change_order(self, new_order):
        self.order = new_order
        self.save()