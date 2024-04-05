from django.db import models
from django.core import validators as v
from .validators import validate_char_type

# Create your models here.
class DevCharacter(models.Model):
    # NOTE: char_id = id of character in LOTR API
    char_id = models.BigIntegerField(unique=True)
    char_type = models.CharField(validators = [validate_char_type])
    start_health = models.BigIntegerField()
    start_stam = models.BigIntegerField()
    start_armor = models.BigIntegerField()
    start_dam = models.BigIntegerField()
    start_att_sp = models.BigIntegerField()
    
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