from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User

from .serializers import UserFullModelSerializer, UserModelSerializer

class UserListAPIView(ListAPIView):
    queryset = User.object.all()



    def get_serializer_class(self):
        if self.request.version == 'V2':
            return UserFullModelSerializer
        return UserModelSerializer