from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import DevAreaSerializer, DevArea
from user_app.views import TokenReq

# Create your views here.
class All_areas(APIView):
    def get(self, request):
        try:
            all_areas = DevAreaSerializer(DevArea.order_by("id"), many=True)
            return Response(all_areas.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_areas = DevAreaSerializer(data = request.data)
        if ser_areas.is_valid():
            ser_areas.save()
            return Response(ser_areas.data, status=HTTP_201_CREATED)
        else:
            print(ser_areas.errors)
            return Response(ser_areas.errors, status=HTTP_400_BAD_REQUEST)

class An_area(APIView):
    def get(self, request, id):
        area = get_object_or_404(DevArea, id = id)
        return Response(DevAreaSerializer(area).data)
    
    def put(self, request, id):
        area = get_object_or_404(DevArea, id = id)
        if 'name' in request.data and request.data['name']:
            area.change_name()
        if 'order' in request.data and request.data['order']:
            area.change_order()
        ser_area = DevAreaSerializer(area, data = request.data, partial = True)
        if ser_area.is_valid():
            ser_area.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_area.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        area = get_object_or_404(DevArea, id = id)
        area.delete()
        return Response(status=HTTP_204_NO_CONTENT)