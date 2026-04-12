from urllib.parse import parse_qs

# default anonymous user
from django.contrib.auth.models import AnonymousUser

# JWT decoder
from rest_framework_simplejwt.tokens import AccessToken

# ✅ IMPORTANT: get your custom user model (Register)
from django.contrib.auth import get_user_model

# to run DB queries in async
from asgiref.sync import sync_to_async

# ✅ this will now return Register model (because of AUTH_USER_MODEL)
User = get_user_model()
from User.models import Register

class JWTAuthMiddleware:

   
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):

        query_string = scope["query_string"].decode()
        query_params = parse_qs(query_string)

        token_list = query_params.get("token")

        if not token_list:
            scope["user"] = AnonymousUser()
            return await self.app(scope, receive, send)

        try:
            token = token_list[0]
            access_token = AccessToken(token)
            user_id = access_token["user_id"]

            user = await sync_to_async(Register.objects.get)(id=user_id)

            scope["user"] = user

        except Exception as e:
            print("JWT ERROR:", e)  # 👈 debug
            scope["user"] = AnonymousUser()

        return await self.app(scope, receive, send)