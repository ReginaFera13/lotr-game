from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import DevStartingInventorySerializer, DevStartingInventory

# Create your views here.
class All_characters_starting_inventory(APIView):
    def get(self, request):
        try:
            all_inventory = DevStartingInventory.objects.order_by("id")
            ser_inventory = DevStartingInventorySerializer(all_inventory, many=True)
            return Response(ser_inventory.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_inventory = DevStartingInventorySerializer(data = request.data)
        if ser_inventory.is_valid():
            ser_inventory.save()
            return Response(ser_inventory.data, status=HTTP_201_CREATED)
        else:
            print(ser_inventory.errors)
            return Response(ser_inventory.errors, status=HTTP_400_BAD_REQUEST)

class A_characters_starting_inventory(APIView):
    def get(self, request, id):
        inventory = get_object_or_404(DevStartingInventory, id = id)
        return Response(DevStartingInventorySerializer(inventory).data)
    
    def put(self, request, id):
        inventory = get_object_or_404(DevStartingInventory, id = id)
        if 'quantity' in request.data and request.data['quantity']:
            inventory.change_quantity()
        ser_inventory = DevStartingInventorySerializer(inventory, data = request.data, partial = True)
        if ser_inventory.is_valid():
            ser_inventory.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_inventory.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        inventory = get_object_or_404(DevStartingInventory, id = id)
        inventory.delete()
        return Response(status=HTTP_204_NO_CONTENT)