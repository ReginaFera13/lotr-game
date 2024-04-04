from rest_framework.serializers import ModelSerializer
from .models import DevDialogueOptions

class DevDialogueOptionsSerializer(ModelSerializer):
    class Meta:
        model = DevDialogueOptions
        fields = '__all__'