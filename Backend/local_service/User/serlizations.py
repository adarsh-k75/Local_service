from rest_framework import serializers
from .models import Register
class CustomerSerlization(serializers.ModelSerializer):
    confirms=serializers.CharField(write_only=True)

    class Meta:
        model=Register
        fields=['id','username','email','password','confirms']
        

        extra_kwargs={
            "password":{"write_only":True}
        }
    def create(self,valiadate):
        valiadate.pop("confirms")
        user=Register.objects.create_user(**valiadate)
        return user
        


    





