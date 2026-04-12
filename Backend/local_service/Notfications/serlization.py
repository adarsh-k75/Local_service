from rest_framework import serializers
from .models import Notfication
class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source="sender.username", read_only=True)
    class Meta:
        model = Notfication
        fields =["id", "message", "created_at", "sender_name","related_booking","recipient","is_read"]