from rest_framework.serializers import ModelSerializer
from .models import GameStats

class GameStatsSerializer(ModelSerializer):
    class Meta:
        model = GameStats
        fields = '__all__'