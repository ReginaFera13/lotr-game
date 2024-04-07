from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import GameSubquestSerializer, GameSubquest

# Create your views here.
class All_game_subquests(APIView):
    def get(self, request):
        try:
            all_subquests = GameSubquestSerializer(GameSubquest.order_by("id"), many=True)
            return Response(all_subquests.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_subquests = GameSubquestSerializer(data = request.data)
        if ser_subquests.is_valid():
            ser_subquests.save()
            return Response(ser_subquests.data, status=HTTP_201_CREATED)
        else:
            print(ser_subquests.errors)
            return Response(ser_subquests.errors, status=HTTP_400_BAD_REQUEST)

class A_game_subquest(APIView):
    def get(self, request, id):
        subquest = get_object_or_404(GameSubquest, id = id)
        return Response(GameSubquestSerializer(subquest).data)
    
    def put(self, request, id):
        subquest = get_object_or_404(GameSubquest, id = id)
        if 'completed' in request.data and request.data['completed']:
            subquest.change_completed()
        ser_subquest = GameSubquestSerializer(subquest, data = request.data, partial = True)
        if ser_subquest.is_valid():
            ser_subquest.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_subquest.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        subquest = get_object_or_404(GameSubquest, id = id)
        subquest.delete()
        return Response(status=HTTP_204_NO_CONTENT)