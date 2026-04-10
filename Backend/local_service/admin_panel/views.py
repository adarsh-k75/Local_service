from django.shortcuts import render
from rest_framework.views import APIView
from User.models import Register,UserProfile
from Booking.models import Booking
from Booking.serlization import Bokkingserliazer
from Services.models import Service


from .serliazer import Userserlizer
from rest_framework.response import Response
from rest_framework import status


class Allusers(APIView):
    def get(self,request):
        user=UserProfile.objects.filter(user__role="customer")
        serlizer=Userserlizer(user,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)

class Allprovider(APIView):
     def get(self,request):
        user=UserProfile.objects.filter(user__role="provider")
        serlizer=Userserlizer(user,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)

class BlockuserandList(APIView):
     def patch(self,request,id): 
        try:
            user = UserProfile.objects.get(user__id=id)
        except UserProfile.DoesNotExist:
          return Response({"error": "User not found"}, status=404)
        user.user.is_active = not user.user.is_active
        user.user.save()
        serlizer=Userserlizer(user)
        return Response(serlizer.data)
     
     def get(self,request,id):
         try:
             booking=Booking.objects.filter(user__id=id)
         except Booking.DoesNotExist:
             return Response({"error":"no booking"})
         selizer=Bokkingserliazer(booking,many=True)
         return Response(selizer.data,status=status.HTTP_200_OK)

         
class verify_id(APIView):
    def patch(self,request,id):
        try:
            user = UserProfile.objects.get(user__id=id)
        except UserProfile.DoesNotExist:
          return Response({"error": "User not found"}, status=404)
        user.is_id_verified =not user.is_id_verified
        user.save()
        serlizer=Userserlizer(user)
        return Response(serlizer.data)

class Provider_booking(APIView):
    def get(self,request,id):
         try:
             booking=Booking.objects.filter(provider__provider__id=id)
         except Booking.DoesNotExist:
             return Response({"error":"no booking"})
         selizer=Bokkingserliazer(booking,many=True)
         return Response(selizer.data,status=status.HTTP_200_OK)
    
class Countes(APIView):
    def get(self,request):
        total_users=Register.objects.filter(role="customer").count()
        total_provider=Register.objects.filter(role="provider").count()
        total_services=Service.objects.count()
        total_booking=Booking.objects.count()
        return Response({"total_users":total_users,
                           "toatl_provider":total_provider,
                           "toatl_services":total_services,
                           "toatl_booking":total_booking
                         },status=status.HTTP_200_OK)


    



