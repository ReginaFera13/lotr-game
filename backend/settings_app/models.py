from django.db import models
from django.core import validators as v
from user_app.models import User

# Create your models here.
class Settings(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    main_vol = models.BigIntegerField(default=50)
    sfx_vol = models.BigIntegerField(default=50)
    music_vol = models.BigIntegerField(default=50)
    
    def __str__(self):
        return f'User: {self.user_id}; Main: {self.main_vol}; SFX: {self.sfx_vol}; Music: {self.music_vol}'
    
    def change_main_vol(self, new_main_vol):
        self.main_vol = new_main_vol
        self.save()
    
    def change_sfx_vol(self, new_sfx_vol):
        self.sfx_vol = new_sfx_vol
        self.save()
    
    def change_music_vol(self, new_music_vol):
        self.music_vol = new_music_vol
        self.save()