from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from.models import ServiceCategory,Service,ProviderService
from .serlization import SrvicesSerliazer,SubServiceSerliazer,ProvideSerliazer
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from User.authtication import CookieJWTAuthentication

from rest_framework import status


class ServicesCatagory(APIView):
    def get(self,request):
        Service=ServiceCategory.objects.all()
        serliaze=SrvicesSerliazer(Service,many=True)
        return Response(serliaze.data,status=status.HTTP_200_OK)
    
class SubServices(APIView):
    def get(self,request,id):
        SubService=Service.objects.filter(category_id=id)
        serlizer=SubServiceSerliazer(SubService,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)
    
class ProviderServices(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    def get(self,request):
        objects=ProviderService.objects.filter(provider=request.user)
        serlizer=ProvideSerliazer(objects,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)
    def post(self,request):
        serlizer=ProvideSerliazer(data=request.data)
        if serlizer.is_valid():
            serlizer.save(provider=request.user)
            return Response(serlizer.data,status=status.HTTP_201_CREATED)
        return Response(serlizer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class UserProviderView(APIView):
    def get(self,request,id):
        objects=ProviderService.objects.filter(service_id=id )
        serlizer=ProvideSerliazer(objects,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)
        

        

        



        