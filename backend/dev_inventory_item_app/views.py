from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import DevInventoryItemSerializer, DevInventoryItem

# Create your views here.
class All_inventory_items(APIView):
    def get(self, request):
        try:
            all_items = DevInventoryItemSerializer(DevInventoryItem.order_by("id"), many=True)
            return Response(all_items.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_items = DevInventoryItemSerializer(data = request.data)
        if ser_items.is_valid():
            ser_items.save()
            return Response(ser_items.data, status=HTTP_201_CREATED)
        else:
            print(ser_items.errors)
            return Response(ser_items.errors, status=HTTP_400_BAD_REQUEST)

class An_inventory_item(APIView):
    def get(self, request, id):
        item = get_object_or_404(DevInventoryItem, id = id)
        return Response(DevInventoryItemSerializer(item).data)
    
    def put(self, request, id):
        item = get_object_or_404(DevInventoryItem, id = id)
        if 'name' in request.data and request.data['name']:
            item.change_name()
        if 'category' in request.data and request.data['category']:
            item.change_category()
        if 'stat' in request.data and request.data['stat']:
            item.change_stat()
        if 'weight' in request.data and request.data['weight']:
            item.change_weight()
        ser_item = DevInventoryItemSerializer(item, data = request.data, partial = True)
        if ser_item.is_valid():
            ser_item.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_item.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        item = get_object_or_404(DevInventoryItem, id = id)
        item.delete()
        return Response(status=HTTP_204_NO_CONTENT)