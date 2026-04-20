from django.db import models
from django.contrib.auth.models import AbstractUser


class Register(AbstractUser):
    Role_choices=(
        ("customer","Customer"),
        ('provider', 'Provider'),
        ('admin', 'Admin'),

    )
    
    role=models.CharField(max_length=30,choices=Role_choices,default="customer")
    is_veryfied = models.BooleanField(default=False)
    
class UserProfile(models.Model):
    user = models.OneToOneField(Register, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    id_card = models.ImageField(upload_to="id_cards/", blank=True, null=True)
    is_id_verified = models.BooleanField(default=False)
    pincode = models.CharField(max_length=6, blank=True, null=True)
    latitude = models.FloatField(null=True, blank=True)  
    longitude = models.FloatField(null=True, blank=True)
    is_online = models.BooleanField(default=False)
    last_seen = models.DateTimeField(null=True, blank=True)
    Bio =models.ImageField(upload_to="provider_profiles/", blank=True, null=True)





    
   
