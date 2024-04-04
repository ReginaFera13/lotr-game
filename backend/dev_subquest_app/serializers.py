from rest_framework.serializers import ModelSerializer
from .models import DevSubquest

class DevSubquestSerializer(ModelSerializer):
    class Meta:
        model = DevSubquest
        fields = '__all__'