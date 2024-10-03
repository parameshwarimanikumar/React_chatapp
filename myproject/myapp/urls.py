from django.urls import path
from .views import get_messages, send_message, update_profile_picture, user_list, create_user, login_user

urlpatterns = [
    path('messages/<int:user_id>/', get_messages, name='get_messages'),  # GET messages with a specific user
    path('messages/', send_message, name='send_message'),  # POST to send a message
    path('profile/update/', update_profile_picture, name='update_profile_picture'),  # PATCH to update profile picture
    path('users/', user_list, name='user_list'),  # GET all users
    path('users/create/', create_user, name='create_user'),  # POST to create a user
    path('login/', login_user, name='login_user'),  # POST to login
]
