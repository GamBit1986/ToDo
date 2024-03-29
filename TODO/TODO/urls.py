"""TODO URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken import views as vi
from rest_framework.authtoken import views as vi
from rest_framework.routers import DefaultRouter
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView


from todoapp import views
from users.views import UsersCustomViewSet
from APIapp.views import UserListAPIView

schema_view = get_schema_view(
    openapi.Info(
        title='TODO',
        default_version="v2",
        description="My project",
        contact=openapi.Contact(email="Tes@mail.ru"),
        license=openapi.License(name="MIT license")
    ),
    public=True,    
)

router = DefaultRouter()
router.register("users", UsersCustomViewSet)
router.register("projects", views.ProjectModelViewSet)
router.register("todo", views.TODOModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(router.urls)),
    path("api-token-auth/", vi.obtain_auth_token),
    path("api/<str:version>/users/", UserListAPIView.as_view()),
    path('swagger/', schema_view.with_ui('swagger')),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
