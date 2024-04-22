from rest_framework.serializers import ModelSerializer, SerializerMethodField
from dev_inventory_item_app.models import DevInventoryItem
from dev_inventory_item_app.serializers import DevInventoryItemSerializer
from .models import GameInventory

class GameInventorySerializer(ModelSerializer):
    item = SerializerMethodField()

    class Meta:
        model = GameInventory
        fields = '__all__'

    def get_item(self, instance):
        item = instance.item_id  # Assuming item_id is an instance of DevInventoryItem
        if item:
            serialized_item = DevInventoryItemSerializer(item).data
            return serialized_item
        return None