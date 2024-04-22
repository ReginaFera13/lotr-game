from django.shortcuts import get_object_or_404
from django.db.models import Q
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
            char_id = request.query_params.get('char_id')  # Extract char_id from query parameters
            if char_id:
                all_inventory = GameInventory.objects.filter(char_id=char_id).order_by("id")
            else:
                all_inventory = GameInventory.objects.all().order_by("id")
            serializer = GameInventorySerializer(all_inventory, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        print('request.data', request.data) # ChatGPT: This is not printing
        ser_inv = GameInventorySerializer(data = request.data)
        if ser_inv.is_valid():
            ser_inv.save()
            return Response(ser_inv.data, status=HTTP_201_CREATED)
        else:
            print(ser_inv.errors)
            return Response(ser_inv.errors, status=HTTP_400_BAD_REQUEST)

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