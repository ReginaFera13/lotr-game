from rest_framework.serializers import ModelSerializer
from .models import DevCharacter

class DevCharacterSerializer(ModelSerializer):
    class Meta:
        model = DevCharacter
        fields = '__all__'