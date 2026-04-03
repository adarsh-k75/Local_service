from django.db import models
from  Services.models import ProviderService
from User.models import Register


class Booking(models.Model):

    user = models.ForeignKey(Register, on_delete=models.CASCADE)
    provider = models.ForeignKey(
        ProviderService,
        on_delete=models.CASCADE
    )
    PAYMENT_STATUS = [
        ("pending","Pending"),
        ("paid","Paid"),
        ("failed","Failed"),
    ]
    STATUS_CHOICES = [
        ("pending","Pending"),
        ("accepted","Accepted"),
        ("completed","Completed"),
        ("cancelled","Cancelled"),
    ]

    booking_date = models.DateField()
    booking_time = models.TimeField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    razorpay_order_id = models.CharField(max_length=200, null=True, blank=True)
    razorpay_payment_id = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        unique_together = ["provider","booking_date","booking_time"]

class Bill(models.Model):
    booking = models.OneToOneField(
        Booking,
        on_delete=models.CASCADE,
        related_name="bill"
    )

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

