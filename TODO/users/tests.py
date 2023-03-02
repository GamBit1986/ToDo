from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from users.views import UsersModelViewSet


class TestUsersModelViewSet(TestCase):
    def setUp(self) -> None:
        self.name = "admin"
        self.password = "admin_123456789"
        self.email = "admin_123456789@mail.ru"

        self.data = {"user_name": "super", "first_name": "Аслан", "last_name": "Муслимов", "email": "email@mail.ru"}
        self.data_put = {
            "user_name": "puper",
            "first_name": "Александр",
            "last_name": "Романов",
            "email": "email1@mail.ru",
        }
        self.url = "/api/users/"
        self.admin = User.objects.create_superuser(username=self.name, password=self.password, email=self.email)

    def test_get_list(self):
        factory = APIRequestFactory()

        request = factory.get(self.url)
        view = UsersModelViewSet.as_view({"get": "list"})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
