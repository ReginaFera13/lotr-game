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
    data = request.data.copy()
    data['username'] = request.data.get("email")
    new_user = User(**data)
    try:
        new_user.full_clean()
        new_user = User.objects.create_user(**data)
        token = Token.objects.create(user= new_user)
        login(request, new_user)
        return [new_user, token]
    except ValidationError as e:
        return e

class Register_admin(APIView):
    def post(self, request):
        creds_or_err = create_user_or_return_exception(request)
        if type(creds_or_err) == list:
            user, token = creds_or_err
            user.is_staff = True
            user.is_superuser = True
            user.save()
            return Response({"user":user.email, "diplay name": user.display_name, "token":token.key}, status=HTTP_201_CREATED)
        return Response(creds_or_err.message_dict, status=HTTP_400_BAD_REQUEST)


class Register(APIView):
    def post(self, request):
        creds_or_err = create_user_or_return_exception(request)
        if type(creds_or_err) == list:
            user, token = creds_or_err
            user.is_staff = False
            user.is_superuser = False
            user.save()
            return Response({"user":user.email, "diplay name": user.display_name, "token":token.key}, status=HTTP_201_CREATED)
        return Response(creds_or_err.message_dict, status=HTTP_400_BAD_REQUEST) 

class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("email")
        user = authenticate(username=data.get("username"), password=data.get("password"))
        if user:
            token, created = Token.objects.get_or_create(user = user)
            login(request, user)
            return Response({"user":user.email, "diplay name": user.display_name, "token":token.key})
        return Response("No user matching these credentials", status=HTTP_404_NOT_FOUND)

class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(TokenReq):
    def get(self, request):
        print(request.user)
        return Response(request.user)

class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)