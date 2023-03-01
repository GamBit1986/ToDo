from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase

# Create your tests here.


class TestProjectModelViewSet(TestCase):

    def setUp(self) -> None:
        return super().setUp()