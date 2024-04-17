from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import DevSubquestSerializer, DevSubquest

# Create your views here.
class All_subquests(APIView):
    def get(self, request):
        try:
            all_subquests = DevSubquest.objects.order_by("id")
            ser_subquests = DevSubquestSerializer(all_subquests, many=True)
            return Response(ser_subquests.data, status=HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_subquests = DevSubquestSerializer(data = request.data)
        if ser_subquests.is_valid():
            ser_subquests.save()
            return Response(ser_subquests.data, status=HTTP_201_CREATED)
        else:
            print(ser_subquests.errors)
            return Response(ser_subquests.errors, status=HTTP_400_BAD_REQUEST)

class A_subquest(APIView):
    def get(self, request, id):
        subquest = get_object_or_404(DevSubquest, id = id)
        return Response(DevSubquestSerializer(subquest).data)
    
    def put(self, request, id):
        subquest = get_object_or_404(DevSubquest, id = id)
        if 'descrip' in request.data and request.data['descrip']:
            subquest.change_descrip()
        if 'order' in request.data and request.data['order']:
            subquest.change_order()
        ser_subquest = DevSubquestSerializer(subquest, data = request.data, partial = True)
        if ser_subquest.is_valid():
            ser_subquest.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_subquest.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        subquest = get_object_or_404(DevSubquest, id = id)
        subquest.delete()
        return Response(status=HTTP_204_NO_CONTENT)