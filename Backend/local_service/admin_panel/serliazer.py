from rest_framework import serializers
from User.models import Register,UserProfile

class Userserlizer(serializers.ModelSerializer):
       username = serializers.CharField(source="user.username", read_only=True)
       email = serializers.EmailField(source="user.email", read_only=True)
       is_active = serializers.BooleanField(source="user.is_active", read_only=True)

       user=serializers.PrimaryKeyRelatedField(queryset=Register.objects.all())
       class Meta:
              model=UserProfile
              fields="__all__"

    
  