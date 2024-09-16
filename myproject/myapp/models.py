# myapp/models.py


from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Use email as unique identifier
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/default-avatar.jpeg')
    username = models.CharField(max_length=150, unique=False, blank=True, null=True)  # Optional

    USERNAME_FIELD = 'email'  # Use email for authentication
    REQUIRED_FIELDS = []  # No required fields for superuser creation

    def __str__(self):
        return self.email
