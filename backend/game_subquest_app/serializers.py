from rest_framework.serializers import ModelSerializer
from .models import GameSubquest

class GameSubquestSerializer(ModelSerializer):
    class Meta:
        model = GameSubquest
        fields = '__all__'