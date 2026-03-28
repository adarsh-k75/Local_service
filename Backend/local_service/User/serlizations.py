from rest_framework import serializers
from .models import Register,UserProfile
class CustomerSerlization(serializers.ModelSerializer):
    confirms=serializers.CharField(write_only=True)

    class Meta:
        model=Register
        fields=['id','username','email','password','confirms','role']
        

        extra_kwargs={
            "password":{"write_only":True}
        }
    def create(self,valiadate_data):
        valiadate_data.pop("confirms")
        user=Register.objects.create_user(**valiadate_data)
        return user
        


class Profiledataserlizer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields="__all__"
        read_only_fields = ["user"]
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["phone", "address", "pincode"]  





