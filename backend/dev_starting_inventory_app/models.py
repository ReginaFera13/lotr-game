from django.db import models
from django.core import validators as v
from dev_character_app.models import DevCharacter
from dev_inventory_item_app.models import DevInventoryItem

# Create your models here.
class DevStartingInventory(models.Model):
    char_id = models.ForeignKey(DevCharacter, on_delete=models.CASCADE)
    item_id = models.ForeignKey(DevInventoryItem, on_delete=models.CASCADE)
    quantity = models.BigIntegerField()
    
    def __str__(self):
        return f'Character: {self.char_id}; Item: {self.item_id}'
    
    def change_quantity(self, new_quantity):
        self.quantity = new_quantity
        self.save()