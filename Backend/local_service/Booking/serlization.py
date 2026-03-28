from  rest_framework import serializers
from .models import Booking,Bill
from Services.serlization import ProvideSerliazer
from Services.models import ProviderService

class Bokkingserliazer(serializers.ModelSerializer):
    provider = serializers.PrimaryKeyRelatedField(
        queryset=ProviderService.objects.all(),
        write_only=True
    )
    provider_details = ProvideSerliazer(
        source="provider",   
        read_only=True
    )
    user_name=serializers.CharField(source="user.username", read_only=True)
    booking_time = serializers.TimeField(format="%I:%M %p")

     

    class Meta:
        model=Booking
        fields="__all__"
        read_only_fields = ["user", "status", "created_at"]


class Billserlizer(serializers.ModelSerializer):

    class Meta:
        model=Bill
        fields="__all__"
    



       
