from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import GameQuestSerializer, GameQuest

# Create your views here.
class All_game_quests(APIView):
    def get(self, request):
        try:
            game_id = request.query_params.get('game_id')
            if game_id:
                all_quests = GameQuest.objects.filter(game_id=game_id).order_by("id")
            else:
                all_quests = GameQuest.objects.all().order_by("id")
            ser_quests = GameQuestSerializer(all_quests, many=True)
            return Response(ser_quests.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_quests = GameQuestSerializer(data = request.data)
        if ser_quests.is_valid():
            ser_quests.save()
            return Response(ser_quests.data, status=HTTP_201_CREATED)
        else:
            print(ser_quests.errors)
            return Response(ser_quests.errors, status=HTTP_400_BAD_REQUEST)

class A_game_quest(APIView):
    def get(self, request, id):
        quest = get_object_or_404(GameQuest, id = id)
        return Response(GameQuestSerializer(quest).data)
    
    def put(self, request, id):
        quest = get_object_or_404(GameQuest, id = id)
        if 'completed' in request.data and request.data['completed']:
            quest.change_completed()
        ser_quest = GameQuestSerializer(quest, data = request.data, partial = True)
        if ser_quest.is_valid():
            ser_quest.save()
            return Response(status=HTTP_200_OK)
        return Response(ser_quest.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        quest = get_object_or_404(GameQuest, id = id)
        quest.delete()
        return Response(status=HTTP_204_NO_CONTENT)