from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import GameInventorySerializer, GameInventory

# Create your views here.
class All_game_character_inventories(APIView):
    def get(self, request):
        try:
            all_chars = GameInventorySerializer(GameInventory.order_by("id"), many=True)
            return Response(all_chars.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_chars = GameInventorySerializer(data = request.data)
        if ser_chars.is_valid():
            ser_chars.save()
            return Response(ser_chars.data, status=HTTP_201_CREATED)
        else:
            print(ser_chars.errors)
            return Response(ser_chars.errors, status=HTTP_400_BAD_REQUEST)

class A_game_character_inventory(APIView):
    def get(self, request, id):
        char = get_object_or_404(GameInventory, id = id)
        return Response(GameInventorySerializer(char).data)
    
    def put(self, request, id):
        char = get_object_or_404(GameInventory, id = id)
        if 'quantity' in request.data and request.data['quantity']:
            char.change_quantity()
        if 'equipt' in request.data and request.data['equipt']:
            char.change_equipt()
        ser_char = GameInventorySerializer(char, data = request.data, partial = True)
        if ser_char.is_valid():
            ser_char.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_char.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        char = get_object_or_404(GameInventory, id = id)
        char.delete()
        return Response(status=HTTP_204_NO_CONTENT)