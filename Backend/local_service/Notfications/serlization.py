from rest_framework import serializers
from .models import Notfication
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notfication
        fields = "__all__"