from django.db import models
from django.core import validators as v
from .validators import validate_name

# Create your models here.
class DevArea(models.Model):
    name = models.CharField(unique=True, validators = [v.MinLengthValidator(4), v.MaxLengthValidator(25), validate_name])
    order = models.BigIntegerField(unique=True)
    
    def __str__(self):
        return f'{self.name}'
    
    def change_name(self, new_name):
        self.name = new_name
        self.save()
    
    def change_order(self, new_order):
        self.order = new_order
        self.save()