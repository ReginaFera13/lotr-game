from rest_framework.serializers import ModelSerializer
from .models import SavedGame

class SavedGameSerializer(ModelSerializer):
    class Meta:
        model = SavedGame
        fields = '__all__'