from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status

from .models import Project, TODO
from .serializers import ProjectModelSerializer, TODOModelSerializer
from .filters import ProjectFilter, TODOFilter

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination

class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    filterset_class = TODOFilter
    pagination_class = TODOLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


