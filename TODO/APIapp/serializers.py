from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name")


class UserFullModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "is_staff", "is_superuser", "username")
