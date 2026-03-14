from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from .serlizations import CustomerSerlization
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from .authtication import CookieJWTAuthentication
from.models import Register
from django.core.mail import send_mail
from django.conf import settings
from .utils import email_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
class RegisterLogic(APIView):

    def get(self, request):
        users = Register.objects.all()
        serializer = CustomerSerlization(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CustomerSerlization(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = email_token_generator.make_token(user)

            verification_link = f"http://localhost:8000/api/verify-email/{uid}/{token}/"

            send_mail(
                "Verify your Email",
                f"Click this link to verify your email:\n{verification_link}",
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False
            )
            return Response(
                {"message":"User created. Check your email."},
                status=201
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginLogic(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        if not user.is_veryfied:
            return Response(
                {"error": "Please verify your email first"},
                status=status.HTTP_403_FORBIDDEN
            )
        refresh = RefreshToken.for_user(user)
        response = Response(
            {"message": "login successfully"},
            status=status.HTTP_200_OK
        )

        response.set_cookie(
            "access_token",
            str(refresh.access_token),
            httponly=True
        )

        response.set_cookie(
            "refresh_token",
            str(refresh),
            httponly=True
        )
        
        return response
class Navbarname(APIView):
     authentication_classes=[CookieJWTAuthentication]
     permission_classes=[IsAuthenticated]
     def get(self, request):
            return Response({"username": request.user.username})

class Profile(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CookieJWTAuthentication]
    
    def patch(self,request):
        serlizaer=CustomerSerlization(request.user,data=request.data,partial=True)
        if serlizaer.is_valid():
            serlizaer.save()
            return Response({"message":"update sucesfuly"})
        return Response(serlizaer.errors, status=400)

        
    def get(self, request):
        serializer = CustomerSerlization(request.user)
        return Response(serializer.data)

class Reset_password(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]

    def post(self,request):
        password=request.data.get("password")
        r_password=request.data.get("r_password")

        if password!=r_password:
            return Response({"error":"password is not match"},status=status.HTTP_400_BAD_REQUEST)
        user=request.user
        user.set_password(password)
        user.save()
        return Response({"message":"password change sucess fully"})



class Logout(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    def post(self,request):
        response=Response(
            status=status.HTTP_200_OK
        )
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response



class Refrsh_token(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error":"No refresh token"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)

            response = Response({"message":"token refreshed"})

            response.set_cookie(
                key="access_token",
                value=new_access_token,
                httponly=True
            )

            return response

        except Exception:
            return Response({"error":"Invalid refresh token"}, status=401)

class VerifyEmail(APIView):

    def get(self, request, uidb64, token):

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = Register.objects.get(pk=uid)

            if email_token_generator.check_token(user, token):
                user.is_veryfied=True
                user.save()

                return Response({"message":"Email verified successfully"})

            else:
                return Response({"error":"Invalid token"}, status=400)

        except:
            return Response({"error":"Invalid link"}, status=400)