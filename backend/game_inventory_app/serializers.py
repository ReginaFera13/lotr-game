from rest_framework.serializers import ModelSerializer, SerializerMethodField
from dev_inventory_item_app.serializers import DevInventoryItemSerializer
from .models import GameInventory

class GameInventorySerializer(ModelSerializer):
    item_id = SerializerMethodField()

    class Meta:
        model = GameInventory
        fields = '__all__'

    def get_item_id(self, instance):
        item_id = instance.item_id
        serialized_item = DevInventoryItemSerializer(item_id).data
        return serialized_item
