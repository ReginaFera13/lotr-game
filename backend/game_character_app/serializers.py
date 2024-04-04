from rest_framework.serializers import ModelSerializer
from .models import GameCharacter

class GameCharacterSerializer(ModelSerializer):
    class Meta:
        model = GameCharacter
        fields = '__all__'