from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import GameAreaSerializer, GameArea

# Create your views here.
class All_game_areas(APIView):
    def get(self, request):
        try:
            all_areas = GameAreaSerializer(GameArea.order_by("id"), many=True)
            return Response(all_areas.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_areas = GameAreaSerializer(data = request.data)
        if ser_areas.is_valid():
            ser_areas.save()
            return Response(ser_areas.data, status=HTTP_201_CREATED)
        else:
            print(ser_areas.errors)
            return Response(ser_areas.errors, status=HTTP_400_BAD_REQUEST)

class A_game_area(APIView):
    def get(self, request, id):
        area = get_object_or_404(GameArea, id = id)
        return Response(GameAreaSerializer(area).data)
    
    def put(self, request, id):
        area = get_object_or_404(GameArea, id = id)
        if 'completed' in request.data and request.data['completed']:
            area.change_completed()
        ser_area = GameAreaSerializer(area, data = request.data, partial = True)
        if ser_area.is_valid():
            ser_area.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_area.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        area = get_object_or_404(GameArea, id = id)
        area.delete()
        return Response(status=HTTP_204_NO_CONTENT)