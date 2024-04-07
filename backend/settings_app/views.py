from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import SettingsSerializer, Settings

# Create your views here.
class All_settings(APIView):
    def get(self, request):
        try:
            all_settings = SettingsSerializer(Settings.order_by("id"), many=True)
            return Response(all_settings.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_settings = SettingsSerializer(data = request.data)
        if ser_settings.is_valid():
            ser_settings.save()
            return Response(ser_settings.data, status=HTTP_201_CREATED)
        else:
            print(ser_settings.errors)
            return Response(ser_settings.errors, status=HTTP_400_BAD_REQUEST)

class A_setting(APIView):
    def get(self, request, id):
        settings = get_object_or_404(Settings, id = id)
        return Response(SettingsSerializer(settings).data)
    
    def put(self, request, id):
        settings = get_object_or_404(Settings, id = id)
        if 'main_vol' in request.data and request.data['main_vol']:
            settings.change_main_vol()
        if 'sfx_vol' in request.data and request.data['sfx_vol']:
            settings.change_sfx_vol()
        if 'music_vol' in request.data and request.data['music_vol']:
            settings.change_music_vol()
        ser_settings = SettingsSerializer(settings, data = request.data, partial = True)
        if ser_settings.is_valid():
            ser_settings.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_settings.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        settings = get_object_or_404(Settings, id = id)
        settings.delete()
        return Response(status=HTTP_204_NO_CONTENT)