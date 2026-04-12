from django.db import models
from User.models import Register
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
     
      content = models.TextField()  
      timestamp = models.DateTimeField(auto_now_add=True)
      is_read = models.BooleanField(default=False)   
