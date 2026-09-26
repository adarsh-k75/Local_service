from django.contrib import admin
from .models import Register
from .models import UserProfile
admin.site.register(UserProfile)
admin.register(Register)
