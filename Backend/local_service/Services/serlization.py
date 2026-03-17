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
    service=SrvicesSerliazer(read_only=True)
    work_image = serializers.SerializerMethodField()

    class Meta :
        model=ProviderService
        fields="__all__"
        read_only_fields = ["provider"]

    
    def get_work_image(self, obj):
        return obj.work_image.url
