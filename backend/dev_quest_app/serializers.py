from rest_framework.serializers import ModelSerializer
from .models import DevQuest

class DevQuestSerializer(ModelSerializer):
    class Meta:
        model = DevQuest
        fields = '__all__'