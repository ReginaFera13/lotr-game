from django.db import models
from django.core import validators as v
from saved_game_app.models import SavedGame
from dev_character_app.models import DevCharacter

# Create your models here.
class GameCharacter(models.Model):
    game_id = models.ForeignKey(SavedGame, on_delete=models.CASCADE)
    char_id = models.ForeignKey(DevCharacter, on_delete=models.CASCADE)
    health = models.BigIntegerField()
    stamina = models.BigIntegerField()
    damage = models.BigIntegerField()
    armor = models.BigIntegerField()
    att_sp = models.DecimalField(max_digits=3, decimal_places=2)
    alive = models.BooleanField(default=True)
    curr_char = models.BooleanField(default=False)
    level = models.BigIntegerField(default=1)
    exp = models.BigIntegerField(default=0)
    
    def __str__(self):
        return f'{self.char_id}'
        
    def change_health(self, new_health):
        self.health = new_health
        self.save()
    
    def change_stamina(self, new_stamina):
        self.stamina = new_stamina
        self.save()
    
    def change_damage(self, new_damage):
        self.damage = new_damage
        self.save()
    
    def change_armor(self, new_armor):
        self.armor = new_armor
        self.save()
    
    def change_att_sp(self, new_att_sp):
        self.att_sp = new_att_sp
        self.save()
    
    def change_alive(self):
        self.alive = not self.alive
        self.save()
    
    def change_curr_char(self):
        self.curr_char = not self.curr_char
        self.save()
    
    def change_level(self):
        self.level += 1
        self.save()
    
    def change_exp(self, exp_points):
        self.exp += exp_points
        self.save()