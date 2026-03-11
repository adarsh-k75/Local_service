from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serlizations import CustomerSerlization
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from .authtication import CookieJWTAuthentication
from.models import Register

class RegisterLogic(APIView):

    def get(self, request):
        users = Register.objects.all()
        serializer = CustomerSerlization(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CustomerSerlization(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

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
     parser_classes=[IsAuthenticated]
     def get(self, request):
            return Response({"username": request.user.username})













 