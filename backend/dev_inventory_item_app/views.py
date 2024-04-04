from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .serializers import DevInventoryItemSerializer, DevInventoryItem

# Create your views here.
class All_inventory_items(APIView):
    pass

class An_inventory_item(APIView):
    pass