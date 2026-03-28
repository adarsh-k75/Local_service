from rest_framework import serializers
from .models import ProviderService,Service,ServiceCategory

class SrvicesSerliazer(serializers.ModelSerializer):

    class Meta:
        model=ServiceCategory
        fields="__all__"

class SubServiceSerliazer(serializers.ModelSerializer):
    class Meta :
        model=Service
        fields="__all__"


class ProvideSerliazer(serializers.ModelSerializer):
    service = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all()
    )
    service_name=SubServiceSerliazer(source="service",read_only=True)
    provider_name = serializers.CharField(source="provider.username", read_only=True)
    work_image_url = serializers.SerializerMethodField()

    
    class Meta :
        model=ProviderService
        fields="__all__"
        read_only_fields = ["provider"]

    
    def get_work_image_url(self, obj):
        if obj.work_image:
            return obj.work_image.url
        return None
