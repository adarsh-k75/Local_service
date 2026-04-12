import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

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

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    async def receive(self, text_data):
        from django.contrib.auth import get_user_model
        from .models import Message

        User = get_user_model()

        data = json.loads(text_data)
        message_text = data.get("message")

        if not message_text:
            return

        await sync_to_async(Message.objects.create)(
            sender=self.user,
            receiver_id=int(self.receiver_id),
            content=message_text
        )

        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "chat_message",
                "message": message_text,
                "sender": self.user.username if self.user.is_authenticated else "Anonymous",
                "sender_id": self.user.id,
            }
        )

        unread_count = await sync_to_async(Message.objects.filter(
            receiver_id=self.receiver_id,
            is_read=False
        ).count)()

        await self.channel_layer.group_send(
            f"user_{self.receiver_id}",
            {
                "type": "chat_count_update",
                "count": unread_count
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "sender": event["sender"],
            "sender_id": event["sender_id"],
        }))

    async def chat_count_update(self, event):
     await self.send(text_data=json.dumps({
        "type": "count_update",
        "count": event["count"]
    }))
     

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
        if hasattr(self, "room_name"):   # ✅ prevent crash
            await self.channel_layer.group_discard(
                self.room_name,
                self.channel_name
            )

    async def chat_count_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "count_update",
            "count": event["count"]
        }))