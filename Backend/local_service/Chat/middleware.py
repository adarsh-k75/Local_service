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


class JWTAuthMiddleware:

    def __init__(self, app):
        self.app = app  # next layer

    async def __call__(self, scope, receive, send):

        # get query string (example: token=abc123)
        query_string = scope["query_string"].decode()
        # convert to dict → {"token": ["abc123"]}
        query_params = parse_qs(query_string)

        try:
            # get token from URL
            token = query_params.get("token")[0]
           

            # decode JWT token
            access_token = AccessToken(token)
            # get user_id from token payload
            user_id = access_token["user_id"]

            # ✅ fetch user from YOUR custom model (Register)
            user = await sync_to_async(User.objects.get)(id=user_id)
            # attach user to scope
            scope["user"] = user

        except Exception:
            # if anything fails → anonymous user
            scope["user"] = AnonymousUser()

        return await self.app(scope, receive, send)