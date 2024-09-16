# myapp/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Add any additional configurations for the user admin

admin.site.register(CustomUser, CustomUserAdmin)
