from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from .serializers import DevNPCDialogueSerializer, DevNPCDialogue

# Create your views here.
class All_npc_dialogue(APIView):
    def get(self, request):
        try:
            all_dialogue = DevNPCDialogueSerializer(DevNPCDialogue.order_by("id"), many=True)
            return Response(all_dialogue.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_dialogue = DevNPCDialogueSerializer(data = request.data)
        if ser_dialogue.is_valid():
            ser_dialogue.save()
            return Response(ser_dialogue.data, status=HTTP_201_CREATED)
        else:
            print(ser_dialogue.errors)
            return Response(ser_dialogue.errors, status=HTTP_400_BAD_REQUEST)

class A_npc_dialogue(APIView):
    def get(self, request, id):
        dialogue = get_object_or_404(DevNPCDialogue, id = id)
        return Response(DevNPCDialogueSerializer(dialogue).data)
    
    def put(self, request, id):
        dialogue = get_object_or_404(DevNPCDialogue, id = id)
        if 'dialogue_text' in request.data and request.data['dialogue_text']:
            dialogue.change_dialogue()
        ser_dialogue = DevNPCDialogueSerializer(dialogue, data = request.data, partial = True)
        if ser_dialogue.is_valid():
            ser_dialogue.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_dialogue.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        dialogue = get_object_or_404(DevNPCDialogue, id = id)
        dialogue.delete()
        return Response(status=HTTP_204_NO_CONTENT)