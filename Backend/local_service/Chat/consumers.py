import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print("WebSocket CONNECT HIT")
        print("hello",self.scope["user"])

        # Lazy get_user_model
        from django.contrib.auth import get_user_model
        User = get_user_model()

        self.receiver_id = self.scope["url_route"]["kwargs"]["receiver_id"]
        self.room_name = f"chat_{self.receiver_id}"
        print("hello",self.room_name)
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

        await self.accept()

    async def receive(self, text_data):
        from django.contrib.auth import get_user_model
        from .models import Message

        User = get_user_model()

        data = json.loads(text_data)
        message_text = data["message"]
        # Save message to DB
        await sync_to_async(Message.objects.create)(
            sender=self.scope["user"], 
            receiver_id=self.receiver_id,
            content=message_text
        )

        # Broadcast to room
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "chat_message",
                "message": message_text,
                "sender": self.scope["user"].username if self.scope["user"].is_authenticated else "Anonymous"
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender": event["sender"]
        }))