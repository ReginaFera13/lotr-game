from django.db import models
from django.core import validators as v
from .validators import validate_category
from dev_area_app.validators import validate_name

# Create your models here.
class DevInventoryItem(models.Model):
    name = models.CharField(unique=True, validators = [v.MinLengthValidator(4), v.MaxLengthValidator(50), validate_name])
    category = models.CharField(validators = [validate_category])
    stat = models.BigIntegerField()
    weight = models.DecimalField(max_digits=4, decimal_places=2)
    
    def __str__(self):
        return f'{self.name}'
    
    def change_name(self, new_name):
        self.name = new_name
        self.save()
    
    def change_category(self, new_category):
        self.category = new_category
        self.save()
    
    def change_stat(self, new_stat):
        self.stat = new_stat
        self.save()
        
    def change_weight(self, new_weight):
        self.weight = new_weight
        self.save()