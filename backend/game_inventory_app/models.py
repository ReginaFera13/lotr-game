from django.db import models
from django.core import validators as v
from game_character_app.models import GameCharacter
from dev_inventory_item_app.models import DevInventoryItem

# Create your models here.
class GameInventory(models.Model):
    char_id = models.ForeignKey(GameCharacter, on_delete=models.CASCADE)
    item_id = models.ForeignKey(DevInventoryItem, on_delete=models.CASCADE)
    quantity = models.BigIntegerField()
    equipt = models.BooleanField(default=False)
    
    def __str__(self):
        return f'Character: {self.char_id}, Item: {self.item_id}; Qty: {self.quantity}; Equipt: {self.equipt}'
    
    def change_quantity(self, method, quantity_added):
        if method == 'add':
            self.quantity += quantity_added
            self.save()
        elif method == 'sub':
            self.quantity -= quantity_added
            self.save()
    
    def change_equipt(self):
        self.equipt = not self.equipt
        self.save()