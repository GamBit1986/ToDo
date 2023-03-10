from rest_framework.serializers import ModelSerializer

from .models import Users


class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ("user_name", "first_name", "last_name", "email")
