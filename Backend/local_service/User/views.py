from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from .serlizations import CustomerSerlization,Profiledataserlizer,UserProfileSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from .authtication import CookieJWTAuthentication
from.models import Register,UserProfile
from django.core.mail import send_mail
from django.conf import settings
from .utils import email_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from rest_framework.parsers import MultiPartParser, FormParser
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
import os
from dotenv import load_dotenv
from django.contrib.auth.tokens import PasswordResetTokenGenerator

load_dotenv()

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
        if user.role == "customer" and not user.is_veryfied:
            return Response(
                {"error": "Please verify your email first"},
                status=status.HTTP_403_FORBIDDEN
            )
        refresh = RefreshToken.for_user(user)
        response = Response(
            {"message": "login successfully",
              "role":user.role,
               "user":user.username,
              "access": str(refresh.access_token),
             },
            status=status.HTTP_200_OK
        )

        response.set_cookie(
            "access_token",
            str(refresh.access_token),
            httponly=True,
            secure=True,
            samesite="Lax"
        )

        response.set_cookie(
            "refresh_token",
            str(refresh),
            httponly=True,
            secure=True,
            samesite="Lax"
        )
        
        return response
class Navbarname(APIView):
     authentication_classes=[CookieJWTAuthentication]
     permission_classes=[IsAuthenticated]
     
     def get(self, request):
            return Response({"username": request.user.username,
                               "role":request.user.role})

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
        return Response(serializer.data,status=status.HTTP_200_OK)

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
        
class Profileaddres(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    parser_classes=[MultiPartParser, FormParser]

    def get(self,request):
        user = request.user
        profile = UserProfile.objects.filter(user=user).first()
        if request.user.role == "provider":
           serializer = Profiledataserlizer(profile)
        else:
           serializer = UserProfileSerializer(profile)
        return Response({ "role": user.role,
                          "profile": serializer.data},status=status.HTTP_200_OK)
        


    def post(self,request):
        if request.user.role == "provider":
           serializer = Profiledataserlizer(data=request.data)
        else:
           serializer = UserProfileSerializer(data=request.data)
   
        user = request.user
        lat = float(request.data.get("latitude"))
        lng = float(request.data.get("longitude"))
        if not user :
            return Response({"error":"user not found"})
        if serializer.is_valid():
            profile= serializer.save(user=user)
            profile.latitude=lat
            profile.longitude=lng
            profile.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self,request):
        user = request.user
        profile = UserProfile.objects.filter(user=user).first()
        
        if request.user.role == "provider":
           serializer = Profiledataserlizer(profile,data=request.data,partial=True)
        else:
           serializer = UserProfileSerializer(profile,data=request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message":"upadte succesfully"},status=status.HTTP_200_OK)
        return Response({"error": "Invalid data"},status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth import get_user_model
import requests
import json
User = get_user_model()
from django.conf import settings

GOOGLE_CLIENT_ID=os.getenv("GOOGLE_CLIENT_ID")
class GoogleLoginAPIView(APIView):
   

    def post(self, request):
        token = request.data.get("token")
        role = request.data.get("role")

        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not role:
            return Response({"error": "Role is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Verify Google token
        google_verify_url = f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        resp = requests.get(google_verify_url)
        if resp.status_code != 200:
            return Response({"error": "Invalid Google token"}, status=status.HTTP_400_BAD_REQUEST)

        google_data = resp.json()
        email = google_data.get("email")
        name = google_data.get("name")
        aud = google_data.get("aud") 

        if aud != GOOGLE_CLIENT_ID:
            return Response({"error": "Token not valid for this client"}, status=status.HTTP_400_BAD_REQUEST)
        


        if not email:
            return Response({"error": "Email not found in Google token"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(
            email=email,
            defaults={"username": email, "is_veryfied": True} 
        )
        if created and name:
            user.first_name = name
            user.save()
        if not user.role:
            user.role = role
            user.is_veryfied = True
            user.save()
        else:
            if user.role != role:
                return Response({"error": f"You are already registered as {user.role}"}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        response = Response({
            "message": "Login successful",
            "role": user.role,
        })

        response.set_cookie("access_token", str(refresh.access_token), httponly=True)
        response.set_cookie("refresh_token", str(refresh), httponly=True)

        return response

password_token=PasswordResetTokenGenerator()

class Forgett_password(APIView):
    def post(self,request):
        email=request.data.get("email")
        if not email:
            return Response({"error":"email required"})
        
        user=Register.objects.filter(email=email).first()
       
        if user:
            token=password_token.make_token(user)
            uid=user.id
            reset_link=f"http://localhost:5173/forget_reset/{uid}/{token}"

            send_mail(
                 "Reset your password",
                    f"Click this link to reset your password: {reset_link}",
                    "no-reply@yourdomain.com",
                    [user.email],
                    fail_silently=False,
            )
        return Response({"message": "If the email exists, a reset link has been sent"})


class Reset_password(APIView):

    def post(self,request,uid,token):
        password = request.data.get("password")
        r_password = request.data.get("r_password")

        if password != r_password:
            return Response({"error": "Passwords do not match"}, status=400)
        
        user=Register.objects.filter(id=uid).first()
        if not user:
            return Response({"error": "Invalid user"}, status=400)

        if not  password_token.check_token(user,token):
            return  Response({"error": "Invalid or expired token"})
        user.set_password(password)
        user.save()
        return Response({"message": "Password reset successfully"})
        




            

    

        
        

        

        
                                                                                                                                                                                                                                                                                                                                    
          






     

    





