from rest_framework.serializers import ModelSerializer, SerializerMethodField
from dev_subquest_app.serializers import DevSubquestSerializer
from .models import GameSubquest

class GameSubquestSerializer(ModelSerializer):
    subquest = SerializerMethodField()
    
    class Meta:
        model = GameSubquest
        fields = '__all__'
    
    def get_subquest(self, instance):
        subquest = instance.subquest_id
        if subquest:
            serialized_subquest = DevSubquestSerializer(subquest).data
            return serialized_subquest
        return None