from django_filters import rest_framework as filters
from .models import Project, TODO


class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = Project
        fields = ['project_name']

class TODOFilter(filters.FilterSet):
    text_to_do = filters.CharFilter(lookup_expr='contains')
    create_or_update = filters.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = TODO
        fields = '__all__'