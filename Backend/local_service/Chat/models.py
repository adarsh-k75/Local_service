from django.db import models
from User.models import Register
from cloudinary.models import CloudinaryField

class Message(models.Model):
      sender = models.ForeignKey(
        Register,
        on_delete=models.CASCADE,
        related_name="sent_messages"
    )  

      receiver = models.ForeignKey(
          Register,
          on_delete=models.CASCADE,
          related_name="received_messages"
      )  
      image = models.ImageField(upload_to='chat_images/', null=True, blank=True)
      content = models.TextField()  
      timestamp = models.DateTimeField(auto_now_add=True)
      is_read = models.BooleanField(default=False)   
