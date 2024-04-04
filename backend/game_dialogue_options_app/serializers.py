from rest_framework.serializers import ModelSerializer
from .models import GameDialogueOptions

class GameDialogueOptionsSerializer(ModelSerializer):
    class Meta:
        model = GameDialogueOptions
        fields = '__all__'