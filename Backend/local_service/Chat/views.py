from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Message
from User.authtication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from User.models import Register
class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request, other_user_id):
        current_user = request.user 

        try:
           receiver = Register.objects.get(id=other_user_id)
        except Register.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        print(receiver.username)
        messages = Message.objects.filter(
              Q(sender=current_user, receiver_id=other_user_id) |  
            Q(sender_id=other_user_id, receiver_id=current_user.id) 
        ).order_by("timestamp")

        # Build response
        data = [
            {
                "message": msg.content,
                "sender_id": msg.sender_id,
                "receiver_id": msg.receiver_id,
                "timestamp": msg.timestamp.strftime("%H:%M"),
                "image": msg.image.url if msg.image else None,
            }
            for msg in messages
        ]

        return Response({
             "reciver":receiver.username,
            "current_user": current_user.id,
            "messages": data
        })
    
class ChatImageUpload(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def post(self, request):
        receiver_id = request.data.get("receiver")
        image = request.FILES.get("image")

        msg = Message.objects.create(
            sender=request.user,
            receiver_id=receiver_id,
            image=image
        )
        user1 = str(request.user.id)
        user2 = str(receiver_id)
        
        ids = sorted([user1, user2])
        room_name = f"chat_{ids[0]}_{ids[1]}"


        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            room_name,
            {
                "type": "chat_message",
                "image": msg.image.url,
                "message": None,
                "sender": request.user.username,
                "sender_id": request.user.id,
                "created_at": str(msg.timestamp)
            }
        )

        return Response({
            "image": msg.image.url
        })