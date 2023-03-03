import math

from django.contrib.auth.models import User
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APISimpleTestCase, APITestCase, force_authenticate

from todoapp.models import TODO, Project
from users.models import Users
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

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format="json")
        view = UsersModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format="json")
        force_authenticate(request, self.admin)
        view = UsersModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        user = Users.objects.create(**self.data)
        response = client.get(f"{self.url}{user.pk}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_guest_create_api(self):
        client = APIClient()
        user = Users.objects.create(**self.data)
        response = client.put(f"{self.url}{user.pk}/", self.data_put)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_create_api(self):
        client = APIClient()
        user = Users.objects.create(**self.data)
        client.login(username=self.name, password=self.password)
        response = client.put(f"{self.url}{user.pk}/", self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        auth = Users.objects.get(id=user.pk)
        self.assertEqual(auth.first_name, "Александр")
        self.assertEqual(auth.last_name, "Романов")
        self.assertEqual(auth.email, "email1@mail.ru")
        client.logout()

    def tearDown(self) -> None:
        return super().tearDown()


class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        response = math.sqrt(4)
        self.assertEqual(response, 2)


class TestTODOViewSet(APITestCase):
    def setUp(self) -> None:
        self.name = "admin"
        self.password = "admin_123456789"
        self.email = "admin_123456789@mail.ru"

        self.data_user = {
            "user_name": "superMan",
            "first_name": "Аслан",
            "last_name": "Муслимов",
            "email": "email@mail.ru",
        }
        self.user = Users.objects.create(**self.data_user)

        self.data_project = {
            "project_name": "test_project",
            "repository_url": "https://stackoverflow.com/",
            "users": self.user,
        }
        self.project = Project.objects.create()

        self.data_todo = {
            "project_name": self.project,
            "text_to_do": "some text",
            "create_or_update": "2023-02-14",
            "user": self.user,
            "is_active": True,
        }
        self.todo_for_update = TODO.objects.create(**self.data_todo)
        self.data_todo_put = {
            "project_name": self.todo_for_update.project_name_id,
            "text_to_do": "some text to change",
            "create_or_update": "2023-02-14",
            "user": self.todo_for_update.user_id,
            "is_active": False,
        }
        self.url = "/api/todo/"

        self.admin = User.objects.create_superuser(username=self.name, password=self.password, email=self.email)

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_admin(self):
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f"{self.url}{self.todo_for_update.id}/", self.data_todo_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_for_update_ = TODO.objects.get(id=self.todo_for_update.id)
        self.assertEqual(todo_for_update_.text_to_do, "some text to change")
        self.assertEqual(todo_for_update_.is_active, False)
        self.client.logout()

    def test_put_mixer(self):
        todo = mixer.blend(TODO)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f"{self.url}{todo.id}/", self.data_todo_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_for_update_ = TODO.objects.get(id=todo.id)
        self.assertEqual(todo_for_update_.text_to_do, "some text to change")
        self.assertEqual(todo_for_update_.is_active, False)
        self.client.logout()

    def test_put_mixer_field(self):
        todo = mixer.blend(TODO, text_to_do="Клевый текст")
        self.assertEqual(todo.text_to_do, "Клевый текст")
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f"{self.url}{todo.id}/", self.data_todo_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo_for_update_ = TODO.objects.get(id=todo.id)
        self.assertEqual(todo_for_update_.text_to_do, "some text to change")
        self.assertEqual(todo_for_update_.is_active, False)
        self.client.logout()

    def tearDown(self) -> None:
        return super().tearDown()
