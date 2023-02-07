from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser



class Users(AbstractBaseUser):
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(        
        max_length=256,
        unique=True
    )
