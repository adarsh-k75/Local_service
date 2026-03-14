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

    
   
