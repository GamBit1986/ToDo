from rest_framework import mixins
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import AllowAny


from .models import Users
from .serializers import UsersModelSerializer


class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
    permission_classes = [AllowAny]


class UsersCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
