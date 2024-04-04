from rest_framework.serializers import ModelSerializer
from .models import GameArea

class GameAreaSerializer(ModelSerializer):
    class Meta:
        model = GameArea
        fields = '__all__'