from rest_framework.serializers import ModelSerializer
from .models import GameQuest

class GameQuestSerializer(ModelSerializer):
    class Meta:
        model = GameQuest
        fields = '__all__'