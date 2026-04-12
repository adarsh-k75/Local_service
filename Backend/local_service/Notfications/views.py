from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from Booking.serlization import Bokkingserliazer
from Booking.models import Booking
from User.authtication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .serlization import NotificationSerializer
from .models import Notfication
from django.db.models import Q
from  Chat.models import Message
class Bookingview(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    def get(self,request):
        booking=Booking.objects.filter(user=request.user).order_by("-created_at")
        serlizer=Bokkingserliazer(booking,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)
    
class Bookingdeatils(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    def get(self,request,id):
        objects=Booking.objects.filter(id=id).filter(Q(user=request.user)|Q(provider__provider=request.user)).first()
        if not objects:
          return Response({"error": "Not allowed"}, status=404)
        serlizer=Bokkingserliazer(objects)
        return Response(serlizer.data,status=status.HTTP_200_OK)


class Notfications(APIView):
      permission_classes=[IsAuthenticated]
      authentication_classes=[CookieJWTAuthentication]
      def get(self, request):
        qs = Notfication.objects.filter(
            recipient=request.user
        ).order_by("-created_at")
        serializer=NotificationSerializer(qs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
        
class Unread_count(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    def get(self,request):
        Request_count=Notfication.objects.filter(
            recipient=request.user,
               is_read=False).count()
        
        chat_count = Message.objects.filter(
            receiver=request.user,
            is_read=False
        ).count()

        total = Request_count + chat_count

        return Response({"count":total,
                         "request_count":Request_count,
                          "chat_count" :chat_count
                         })
    
class Mark_read(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    def post(self,request):
      Notfication.objects.filter(
          recipient=request.user,
          is_read=False
      ).update(is_read=True)
      return Response({"message": "done"})


class MarkChatRead(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def post(self, request, user_id):
        Message.objects.filter(
            sender_id=user_id,
            receiver=request.user,
            is_read=False
        ).update(is_read=True)

        return Response({"message": "chat read"})
     