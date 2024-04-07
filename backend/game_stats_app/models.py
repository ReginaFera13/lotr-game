from django.db import models
from django.core import validators as v
from saved_game_app.validators import validate_diff_level
from user_app.models import User

# Create your models here.
class GameStats(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    diff_level = models.CharField(validators = [v.MinLengthValidator(4), v.MaxLengthValidator(6), validate_diff_level])
    total_enemies_killed = models.BigIntegerField(default=0)
    total_resources_collected = models.BigIntegerField(default=0)
    total_hours_played = models.DurationField(default=0)
    total_times_killed = models.BigIntegerField(default=0)
    games_completed = models.BigIntegerField(default=0)
    
    def __str__(self):
        return f'User: {self.user_id}; Difficulty: {self.diff_level}; Enemies: {self.total_enemies_killed}; Resources: {self.total_resources_collected}; Hours: {self.total_hours_played}; Deaths: {self.total_times_killed}; Games: {self.games_completed}'
    
    def change_enemies_killed(self):
        self.total_enemies_killed += 1
        self.save()
    
    def change_resources_collected(self, new_resources_collected):
        self.total_resources_collected += 1
        self.save()
    
    def change_hours_played(self, new_hours_played):
        self.total_hours_played += new_hours_played
        self.save()
    
    def change_times_killed(self):
        self.total_times_killed += 1
        self.save()
    
    def change_games_completed(self):
        self.games_completed += 1
        self.save()