import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from django.utils import timezone
class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print("WebSocket CONNECT HIT")

        self.user = self.scope["user"]

        self.receiver_id = self.scope["url_route"]["kwargs"]["receiver_id"]

        ids = sorted([str(self.user.id), str(self.receiver_id)])
        self.room_name = f"chat_{ids[0]}_{ids[1]}"

        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )
        self.user_group = f"user_{self.user.id}"
        await self.channel_layer.group_add(
        self.user_group,
        self.channel_name
         )
        
        if self.user.is_authenticated:
         await sync_to_async(self.set_online)()
 
         # 🔥 notify other user
         await self.channel_layer.group_send(
             f"user_{self.receiver_id}",
             {
                 "type": "user_status",
                 "status": "online",
                 "user_id": self.user.id
             }
         )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

        if self.user.is_authenticated:
           await sync_to_async(self.set_offline)()
   
           # 🔥 notify other user
           await self.channel_layer.group_send(
               f"user_{self.receiver_id}",
               {
                   "type": "user_status",
                   "status": "offline",
                   "user_id": self.user.id
               }
           )




    async def receive(self, text_data):
        from django.contrib.auth import get_user_model
        from .models import Message

        User = get_user_model()

        data = json.loads(text_data)
        message_text = data.get("message")
    
        # 1. STOP if no message OR user is not logged in
        # This prevents the "AnonymousUser" crash
        if not message_text or not self.user.is_authenticated:
            print("DEBUG: Message rejected - User not authenticated or empty message")
            return
    
        # 2. Save to DB (Safe now because we checked authentication)
        await sync_to_async(Message.objects.create)(
            sender=self.user,
            receiver_id=int(self.receiver_id),
            content=message_text
        )
    
        # 3. Send to Room Group (For the current chat window)
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "chat_message",
                "message": message_text,
                "sender": self.user.username,
                "sender_id": self.user.id,
                "created_at": str(timezone.now())
            }
        )
    
        # 4. Update the Unread Count for the Receiver
        unread_count = await sync_to_async(Message.objects.filter(
            receiver_id=self.receiver_id,
            is_read=False
        ).count)()
    
        await self.channel_layer.group_send(
            f"user_{self.receiver_id}",
            {
                "type": "count_update",
                "count": unread_count
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender_id": event["sender_id"],
            "sender": event["sender"],
            "image": event.get("image")
        }))

    async def count_update(self, event):
     await self.send(text_data=json.dumps({
        "type": "count_update",
        "count": event["count"]
    }))
     
    async def user_status(self, event):
        await self.send(text_data=json.dumps({
            "type": "user_status",
            "status": event["status"],
            "user_id": event["user_id"]
        }))

    def set_online(self):
        profile = self.user.userprofile
        profile.is_online = True
        profile.save()

    def set_offline(self):
        profile = self.user.userprofile
        profile.is_online = False
        profile.last_seen = timezone.now()
        profile.save()
     

class NotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user = self.scope["user"]

        if self.user.is_anonymous:
            await self.close()
            return

        # 🔥 personal room
        self.room_name = f"user_{self.user.id}"

        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "room_name"):   
            await self.channel_layer.group_discard(
                self.room_name,
                self.channel_name
            )

    async def count_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "count_update",
            "count": event["count"]
        }))

    async def booking_count_update(self, event):  # 🔥 ADD THIS
        await self.send(text_data=json.dumps({
            "type": "booking_count_update",
            "count": event["count"]
        }))

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "new_message",
            "message": event["message"],
            "sender": event["sender"],
            "sender_id": event["sender_id"],
            "created_at": event["created_at"]
        }))

    async def booking_notification(self, event):
     await self.send(text_data=json.dumps({
         "type": "booking",
         "message": event["message"],
         "sender": event["sender"],
         "sender_id": event["sender_id"],
         "related_booking": event["booking_id"],
         "created_at": event["created_at"]
     }))

    async def user_status(self, event):
      await self.send(text_data=json.dumps({
          "type": "user_status",
          "status": event["status"],
          "user_id": event["user_id"]
      }))