from django.db import models
from User.models import Register
from cloudinary.models import CloudinaryField

class ServiceCategory(models.Model):
    name=models.CharField(max_length=30)

class Service(models.Model):
    category = models.ForeignKey(ServiceCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)


class ProviderService(models.Model):
    provider = models.ForeignKey(Register, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    experience = models.PositiveIntegerField()
    work_image = CloudinaryField("image")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)