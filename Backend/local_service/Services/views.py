from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from.models import ServiceCategory,Service,ProviderService
from .serlization import SrvicesSerliazer,SubServiceSerliazer,ProvideSerliazer
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from User.authtication import CookieJWTAuthentication
from rest_framework import status
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from User.models import UserProfile
from geopy.distance import geodesic


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
    parser_classes = (MultiPartParser, FormParser)
    def get(self,request):
        objects=ProviderService.objects.filter(provider=request.user)
        serlizer=ProvideSerliazer(objects,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)
    def post(self,request):
        profile = UserProfile.objects.filter(user=request.user).first()

        if not profile or not profile.phone or not profile.address or not profile.pincode:
            return Response({"error": "Complete your profile first"}, status=400)
        
        serlizer=ProvideSerliazer(data=request.data)
        if serlizer.is_valid():
            serlizer.save(provider=request.user)
            return Response({"message":"Service Added Successfully"},status=status.HTTP_201_CREATED)
        return Response(serlizer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class UserProviderView(APIView):
    def get(self,request,id):
        objects=ProviderService.objects.filter(service_id=id )
        serlizer=ProvideSerliazer(objects,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)
        

class Get_near_provider(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[CookieJWTAuthentication]
    def get(self,request,id):
        user=request.user
        user_profile=UserProfile.objects.filter(user=user).first()
        if not user_profile or not user_profile.latitude:
            return Response({"error":"First Update your profile"})
        providers=ProviderService.objects.filter(service_id=id).select_related("provider__userprofile")

        if not providers:
            return Response([])
       
        near_by=[]

        for p in providers:
            provider_profile=UserProfile.objects.filter(user=p.provider).first()
            if provider_profile and provider_profile.latitude:
                user_log=(user_profile.latitude,user_profile.longitude)
                provider_log=(provider_profile.latitude,provider_profile.longitude)
                
                distance=geodesic(user_log,provider_log).km
                if distance <= 10:
                    data=ProvideSerliazer(p).data
                    data["distance"]=distance
                    near_by.append(data)
        near_by.sort(key=lambda x: x["distance"])
        return Response(near_by)



class  Search(APIView):
    def get(self,request):
        query=request.GET.get("q","")
        service=ProviderService.objects.filter(service__name__icontains=query)
        serlizer=ProvideSerliazer(service,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)

class Subservice_navbar(APIView):
    def get(self,request):
        services=Service.objects.all()
        serlizer=SubServiceSerliazer(services,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)

         




        