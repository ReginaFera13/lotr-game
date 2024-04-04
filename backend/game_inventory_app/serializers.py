from rest_framework.serializers import ModelSerializer
from .models import GameInventory

class GameInventorySerializer(ModelSerializer):
    class Meta:
        model = GameInventory
        fields = '__all__'