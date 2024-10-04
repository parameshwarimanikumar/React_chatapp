from rest_framework import serializers
from .models import CustomUser, Message
from django.contrib.auth.password_validation import validate_password
from django.conf import settings

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'content', 'timestamp', 'sender', 'receiver']


class UpdateProfilePictureSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['profile_picture', 'profile_picture_url']

    def get_profile_picture_url(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url) if request else obj.profile_picture.url
        return None


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'profile_picture', 'profile_picture_url', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            profile_picture=validated_data.get('profile_picture', None)
        )
        return user

    def validate_password(self, value):
        # Use Django's password validation
        validate_password(value)
        return value

    def get_profile_picture_url(self, obj):
        # Return the full URL for the profile picture
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url) if request else obj.profile_picture.url
        return None
