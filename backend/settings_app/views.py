from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .serializers import SettingsSerializer, Settings

# Create your views here.
class All_settings(APIView):
    pass

class A_setting(APIView):
    pass