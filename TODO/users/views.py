from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .models import Users
from .serializers import UsersModelSerializer
from rest_framework import mixins


class UsersModelViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer


class UsersCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin,
    mixins.RetrieveModelMixin, GenericViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]