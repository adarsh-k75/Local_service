from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from Booking.models import Booking,Bill
from payments.razorpay_client import client
from django.conf import settings


class CreateOrderView(APIView):

    def post(self,request):
        booking_id=request.data.get("booking_id")
        booking=Booking.objects.get(id=booking_id)
        amount=int(booking.bill.amount*100)
        
        order=client.order.create({
              "amount":amount,
              "currency": "INR",
              "payment_capture": 1
        })
        
        booking.razorpay_order_id=order["id"]
        booking.save()
        return Response({"amount":amount,
                          "order_id":order["id"],
                          "key":settings.RAZORPAY_KEY_ID

                         })


class VerifyPaymentView(APIView):

    def post(self, request):
        booking_id = request.data.get("booking_id")

        booking = Booking.objects.get(id=booking_id)

       
        try:
            client.utility.verify_payment_signature({
                'razorpay_order_id': request.data.get("order_id"),
                'razorpay_payment_id': request.data.get("payment_id"),
                'razorpay_signature': request.data.get("signature")
            })

            booking.payment_status = "paid"
            booking.razorpay_payment_id = request.data.get("payment_id")
            booking.save()

            return Response({"status": "success"})

        except:
            booking.payment_status = "failed"
            booking.save()

            return Response({"status": "failed"})