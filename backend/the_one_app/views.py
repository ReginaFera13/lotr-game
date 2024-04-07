from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from requests_oauthlib import OAuth1
from django.http import JsonResponse
from lotr_proj.settings import env

class The_one_api(APIView):
    def get(self, request):
        url = " https://the-one-api.dev/v2/character"
        headers = {
            'Accept': 'application/json',
            'Authorization': f'Bearer {env.get("THE_ONE_API_KEY")}'
        }
        response = requests.get(url, headers=headers)
        responseJSON = response.json()
        return Response(responseJSON)