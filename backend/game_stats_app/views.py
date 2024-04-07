from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import GameStats, GameStatsSerializer

# Create your views here.
class All_game_stats(APIView):
    def get(self, request):
        try:
            all_stats = GameStatsSerializer(GameStats.order_by("id"), many=True)
            return Response(all_stats.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_stats = GameStatsSerializer(data = request.data)
        if ser_stats.is_valid():
            ser_stats.save()
            return Response(ser_stats.data, status=HTTP_201_CREATED)
        else:
            print(ser_stats.errors)
            return Response(ser_stats.errors, status=HTTP_400_BAD_REQUEST)

class A_game_stat(APIView):
    def get(self, request, id):
        stats = get_object_or_404(GameStats, id = id)
        return Response(GameStatsSerializer(stats).data)
    
    def put(self, request, id):
        stats = get_object_or_404(GameStats, id = id)
        if 'total_enemies_killed' in request.data and request.data['total_enemies_killed']:
            stats.change_enemies_killed()
        if 'total_resources_collected' in request.data and request.data['total_resources_collected']:
            stats.change_resources_collected()
        if 'total_hours_played' in request.data and request.data['total_hours_played']:
            stats.change_hours_played()
        if 'total_times_killed' in request.data and request.data['total_times_killed']:
            stats.change_times_killed()
        if 'games_completed' in request.data and request.data['games_completed']:
            stats.change_games_completed()
        ser_stats = GameStatsSerializer(stats, data = request.data, partial = True)
        if ser_stats.is_valid():
            ser_stats.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_stats.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        stats = get_object_or_404(GameStats, id = id)
        stats.delete()
        return Response(status=HTTP_204_NO_CONTENT)