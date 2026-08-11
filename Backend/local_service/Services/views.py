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
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [AllowAny]
    def get(self,request):
        print("USER:", request.user)
        print("AUTH:", request.auth)
        Service=ServiceCategory.objects.all()
        serliaze=SrvicesSerliazer(Service,many=True)
        return Response(serliaze.data,status=status.HTTP_200_OK)
    
class SubServices(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [AllowAny]
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
            return Response({"error": "Complete your profile first"}, status=status.HTTP_400_BAD_REQUEST)
        
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
        providers=ProviderService.objects.filter(service_id=id).select_related("provider__userprofile")

        if not providers:
            return Response([])
       
        near_by=[]

        for p in providers:
            provider_profile=UserProfile.objects.filter(user=p.provider).first()
            data=ProvideSerliazer(p).data
            
            # Check if user profile coordinates and provider coordinates are both available
            if user_profile and user_profile.latitude and provider_profile and provider_profile.latitude:
                user_log=(user_profile.latitude,user_profile.longitude)
                provider_log=(provider_profile.latitude,provider_profile.longitude)
                
                distance=geodesic(user_log,provider_log).km
                data["distance"]=distance
                data["is_nearby"] = distance <= 10
            else:
                data["distance"]=None
                data["is_nearby"]=False
                
            near_by.append(data)
            
        # Sort so that nearby ones are first, and ones without distance info are last
        near_by.sort(key=lambda x: (x["distance"] is None, x["distance"]))
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
    
class Service_provider(APIView):
    def get(self,request):
        objects=ProviderService.objects.all()
        serlizer=ProvideSerliazer(objects,many=True)
        return Response(serlizer.data,status=status.HTTP_200_OK)




         




        