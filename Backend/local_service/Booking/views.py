from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serlization import Bokkingserliazer,Billserlizer
from rest_framework import status
from .models import Booking
from User.authtication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from Notfications.models import Notfication
from rest_framework.exceptions import PermissionDenied
from .models import Bill
from User.models import UserProfile

class BookingView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]

    def post(self, request):
        provider = request.data.get('provider')
        booking_date = request.data.get('booking_date')
        booking_time = request.data.get('booking_time')
        
        profile = UserProfile.objects.filter(user=request.user).first()

        if not profile or not profile.phone or not profile.address or not profile.pincode:
            return Response({"error": "Complete your profile first"}, status=400)

        exist = Booking.objects.filter(
            provider=provider,
            booking_date=booking_date,
            booking_time=booking_time,
            status__in=["pending", "accepted"]
        ).exists()

        if exist:
            return Response({"error": "slot already booked"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = Bokkingserliazer(data=request.data)

        if serializer.is_valid():
            booking = serializer.save(user=request.user)  # ✅ FIXED
            Notfication.objects.create(
                recipient=booking.user,
                message="Your booking has been placed",
                related_booking=booking
            )

            Notfication.objects.create(
                recipient=booking.provider.provider,
                message="You received a new booking",
                related_booking=booking
            )

            return Response({"message": "booked successfully"})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateStatus(APIView):
     permission_classes=[IsAuthenticated]
     authentication_classes=[CookieJWTAuthentication]
     def patch(self,request,id):
         try:
             booking = Booking.objects.get(id=id)
         except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=status.HTTP_204_NO_CONTENT)
         status_new=request.data.get("status")
         if booking.provider.provider!=request.user:
           raise PermissionDenied("Not allowed")
          
         print("hello",status_new)
         booking.status=status_new
         booking.save()
         
         if status_new in ["accepted","cancelled"]:
             Notfication.objects.create(
                recipient=booking.user,
                message=f"Your booking is {status_new}",
                related_booking=booking
             )
         return Response({"message": "status updated"})

class Addbill(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]

    def get(self,request,id):
        bills=Bill.objects.filter(booking_id=id).first()
        serlizer=Billserlizer(bills)
        return Response(serlizer.data,status=status.HTTP_200_OK)

    def post(self,request,id):
        booking=Booking.objects.get(id=id)
        if Bill.objects.filter(booking=booking).exists():
            return Response({"error": "Bill already exists"}, status=status.HTTP_200_OK)
        booking.status="completed"
        booking.save()
        
        amount=request.data.get("amount")
        desc = request.data.get("description")

        Bill.objects.create(
           booking=booking,
           amount=amount,
           description=desc
        )
        Notfication.objects.create(
            recipient=booking.user,
            message=f"Your service is completed. Bill amount: ₹{amount}",
            related_booking=booking
        )

        return Response({"message": "Bill added and booking completed"})

        

        