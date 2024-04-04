from rest_framework.serializers import ModelSerializer
from .models import DevStartingInventory

class DevStartingInventorySerializer(ModelSerializer):
    class Meta:
        model = DevStartingInventory
        fields = '__all__'