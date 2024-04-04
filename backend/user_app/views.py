from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_404_NOT_FOUND,
    HTTP_400_BAD_REQUEST
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout
from .models import User

# Create your views here.

def create_user_or_return_exception(request):
    pass

class Register_admin(APIView):
    pass

class Register(APIView):
    pass

class Log_in(APIView):
    pass

class TokenReq(APIView):
    pass

class Info(TokenReq):
    pass

class Log_out(TokenReq):
    pass