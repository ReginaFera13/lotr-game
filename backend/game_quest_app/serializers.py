from rest_framework.serializers import ModelSerializer, SerializerMethodField
from dev_quest_app.serializers import DevQuestSerializer 
from .models import GameQuest

class GameQuestSerializer(ModelSerializer):
    quest = SerializerMethodField()
    
    class Meta:
        model = GameQuest
        fields = '__all__'
        
    def get_quest(self, instance):
        quest = instance.quest_id
        if quest:
            serialized_quest = DevQuestSerializer(quest).data
            return serialized_quest
        return None