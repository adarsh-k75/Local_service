from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Message
from User.authtication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated

class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request, other_user_id):
        current_user = request.user 

        # Fetch all messages between current user (provider) and selected user
        messages = Message.objects.filter(
              Q(sender=current_user, receiver_id=other_user_id) |  # sent by provider
            Q(sender_id=other_user_id, receiver_id=current_user.id) 
        ).order_by("timestamp")

        # Build response
        data = [
            {
                "message": msg.content,
                "sender_id": msg.sender_id,
                "receiver_id": msg.receiver_id,
                "timestamp": msg.timestamp.strftime("%H:%M"),
            }
            for msg in messages
        ]

        return Response({
            "current_user": current_user.id,
            "messages": data
        })