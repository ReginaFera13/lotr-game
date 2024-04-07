from django.db import models
from django.core import validators as v
from .validators import validate_char_type

# Create your models here.
class DevCharacter(models.Model):
    # NOTE: char_id = id of character in LOTR API
    char_id = models.CharField(unique=True)
    char_type = models.CharField(validators = [validate_char_type])
    merchant = models.BooleanField(default=False)
    quest_giver = models.BooleanField(default=False)
    enemy = models.BooleanField(default=False)
    boss = models.BooleanField(default=False)
    start_health = models.BigIntegerField(default=100)
    start_stam = models.BigIntegerField(default=100)
    start_armor = models.BigIntegerField(default=50)
    start_dam = models.BigIntegerField(default=10)
    start_att_sp = models.DecimalField(default=1.0, max_digits=3, decimal_places=2)
    
    def __str__(self):
        return f'{self.char_id}'
    
    def change_health(self, new_health):
        self.start_health = new_health
        self.save()
    
    def change_stam(self, new_stam):
        self.start_stam = new_stam
        self.save()
    
    def change_armor(self, new_armor):
        self.start_armor = new_armor
        self.save()
    
    def change_dam(self, new_dam):
        self.start_dam = new_dam
        self.save()
    
    def change_att_sp(self, new_att_sp):
        self.start_att_sp = new_att_sp
        self.save()