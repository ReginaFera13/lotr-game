from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import DevCharacterSerializer, DevCharacter

# Create your views here.
class All_characters(APIView):
    def get(self, request):
        try:
            all_chars = DevCharacterSerializer(DevCharacter.order_by("id"), many=True)
            return Response(all_chars.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_chars = DevCharacterSerializer(data = request.data)
        if ser_chars.is_valid():
            ser_chars.save()
            return Response(ser_chars.data, status=HTTP_201_CREATED)
        else:
            print(ser_chars.errors)
            return Response(ser_chars.errors, status=HTTP_400_BAD_REQUEST)

class A_character(APIView):
    def get(self, request, id):
        char = get_object_or_404(DevCharacter, id = id)
        return Response(DevCharacterSerializer(char).data)
    
    def put(self, request, id):
        char = get_object_or_404(DevCharacter, id = id)
        if 'start_health' in request.data and request.data['start_health']:
            char.change_health()
        if 'start_stam' in request.data and request.data['start_stam']:
            char.change_stam()
        if 'start_armor' in request.data and request.data['start_armor']:
            char.change_armor()
        if 'start_dam' in request.data and request.data['start_dam']:
            char.change_dam()
        if 'start_att_sp' in request.data and request.data['start_att_sp']:
            char.change_att_sp()
        ser_char = DevCharacterSerializer(char, data = request.data, partial = True)
        if ser_char.is_valid():
            ser_char.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_char.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        char = get_object_or_404(DevCharacter, id = id)
        char.delete()
        return Response(status=HTTP_204_NO_CONTENT)