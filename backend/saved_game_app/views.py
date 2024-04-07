from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import SavedGameSerializer, SavedGame

# Create your views here.
class All_saved_games(APIView):
    def get(self, request):
        try:
            all_games = SavedGameSerializer(SavedGame.order_by("id"), many=True)
            return Response(all_games.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_games = SavedGameSerializer(data = request.data)
        if ser_games.is_valid():
            ser_games.save()
            return Response(ser_games.data, status=HTTP_201_CREATED)
        else:
            print(ser_games.errors)
            return Response(ser_games.errors, status=HTTP_400_BAD_REQUEST)

class A_saved_game(APIView):
    def get(self, request, id):
        game = get_object_or_404(SavedGame, id = id)
        return Response(SavedGameSerializer(game).data)
    
    def put(self, request, id):
        game = get_object_or_404(SavedGame, id = id)
        if 'save_date' in request.data and request.data['save_date']:
            game.change_save_date()
        if 'scene_state' in request.data and request.data['scene_state']:
            game.change_scene_state()
        ser_game = SavedGameSerializer(game, data = request.data, partial = True)
        if ser_game.is_valid():
            ser_game.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_game.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        game = get_object_or_404(SavedGame, id = id)
        game.delete()
        return Response(status=HTTP_204_NO_CONTENT)