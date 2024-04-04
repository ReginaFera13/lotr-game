from rest_framework.serializers import ModelSerializer
from .models import DevInventoryItem

class DevInventoryItemSerializer(ModelSerializer):
    class Meta:
        model = DevInventoryItem
        fields = '__all__'