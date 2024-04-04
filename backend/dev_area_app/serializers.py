from rest_framework.serializers import ModelSerializer
from .models import DevArea

class DevAreaSerializer(ModelSerializer):
    class Meta:
        model = DevArea
        fields = '__all__'