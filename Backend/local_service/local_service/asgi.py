import os

# ✅ STEP 1: set settings FIRST
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "local_service.settings")

# ✅ STEP 2: initialize Django
import django
django.setup()

# ✅ STEP 3: now safe to import everything
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

import Chat.routing
from Chat.middleware import JWTAuthMiddleware
from channels.security.websocket import AllowedHostsOriginValidator

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(  
        JWTAuthMiddleware(
            AuthMiddlewareStack(
                URLRouter(
                    Chat.routing.websocket_urlpatterns
                )
            )
        )
    ),
})