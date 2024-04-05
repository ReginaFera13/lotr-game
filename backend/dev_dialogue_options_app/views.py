from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .serializers import DevDialogueOptionsSerializer, DevDialogueOptions

# Create your views here.
class All_dialogue_options(APIView):
    def get(self, request):
        try:
            all_dialogue = DevDialogueOptionsSerializer(DevDialogueOptions.order_by("id"), many=True)
            return Response(all_dialogue.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        ser_dialogue = DevDialogueOptionsSerializer(data = request.data)
        if ser_dialogue.is_valid():
            ser_dialogue.save()
            return Response(ser_dialogue.data, status=HTTP_201_CREATED)
        else:
            print(ser_dialogue.errors)
            return Response(ser_dialogue.errors, status=HTTP_400_BAD_REQUEST)

class A_dialogue_option(APIView):
    def get(self, request, id):
        dialogue = get_object_or_404(DevDialogueOptions, id = id)
        return Response(DevDialogueOptionsSerializer(dialogue).data)
    
    def put(self, request, id):
        dialogue = get_object_or_404(DevDialogueOptions, id = id)
        if 'dialogue_text' in request.data and request.data['dialogue_text']:
            dialogue.change_dialogue()
        if 'npc_dialogue_id' in request.data and request.data['npc_dialogue_id']:
            dialogue.change_npc_dialogue()
        ser_dialogue = DevDialogueOptionsSerializer(dialogue, data = request.data, partial = True)
        if ser_dialogue.is_valid():
            ser_dialogue.save()
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(ser_dialogue.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        dialogue = get_object_or_404(DevDialogueOptions, id = id)
        dialogue.delete()
        return Response(status=HTTP_204_NO_CONTENT)