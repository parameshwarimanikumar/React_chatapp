# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.user_list, name='user-list'),
    path('users/create/', views.create_user, name='create-user'),
    path('login/', views.login_user, name='login'),
    path('profile-picture/', views.update_profile_picture, name='update-profile-picture'),
]

