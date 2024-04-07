from rest_framework.serializers import ModelSerializer
from .models import DevNPCDialogue

class DevNPCDialogueSerializer(ModelSerializer):
    class Meta:
        model = DevNPCDialogue
        fields = '__all__'