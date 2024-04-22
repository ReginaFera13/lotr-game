from urllib import request
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import GameCharacterSerializer, GameCharacter

# Create your views here.
class All_game_characters(APIView):
    def get(self, request):
        try:
            all_characters = GameCharacterSerializer(GameCharacter.order_by("id"), many=True)
            return Response(all_characters.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_characters = GameCharacterSerializer(data = request.data)
        if ser_characters.is_valid():
            ser_characters.save()
            return Response(ser_characters.data, status=HTTP_201_CREATED)
        else:
            print(ser_characters.errors)
            return Response(ser_characters.errors, status=HTTP_400_BAD_REQUEST)

class A_game_character(APIView):
    def get(self, request, game_id, id):
        char = get_object_or_404(GameCharacter, game_id=game_id, char_id=id)
        return Response(GameCharacterSerializer(char).data)
    
    def put(self, request, game_id, id):
        char = get_object_or_404(GameCharacter, game_id=game_id, char_id=id)
        print(char)
        if 'health' in request.data:
            char.change_health(request.data['health'])
        if 'stamina' in request.data:
            char.change_stamina(request.data['stamina'])
        if 'damage' in request.data:
            char.change_damage(request.data['damage'])
        if 'armor' in request.data:
            char.change_armor(request.data['armor'])
        if 'att_sp' in request.data:
            char.change_att_sp(request.data['att_sp'])
        if 'alive' in request.data:
            char.change_alive()
        if 'curr_char' in request.data:
            char.change_curr_char(request.data['curr_char'])
        if 'level' in request.data:
            char.change_level(request.data['level'])
        if 'exp' in request.data:
            char.change_exp(request.data['exp'])
        ser_char = GameCharacterSerializer(char, data=request.data, partial=True)
        if ser_char.is_valid():
            ser_char.save()
            return Response(status=HTTP_200_OK)
        return Response(ser_char.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, game_id, id):
        char = get_object_or_404(GameCharacter, game_id=game_id, char_id = id)
        char.delete()
        return Response(status=HTTP_204_NO_CONTENT)