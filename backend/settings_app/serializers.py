from rest_framework.serializers import ModelSerializer
from .models import Settings

class SettingsSerializer(ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'