import graphene
from graphene_django import DjangoObjectType
from todoapp.models import TODO, Project
from users.models import Users

class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class UsersType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'

class Query(graphene.ObjectType):
    all_todo = graphene.List(TODOType)
    """ all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UsersType)    
 """
    def resolve_all_todo(self, info):
        return TODO.objects.all()



schema = graphene.Schema(query=Query)