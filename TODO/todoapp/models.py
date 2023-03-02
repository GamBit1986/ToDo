from datetime import date

from django.db import models

from users.models import Users


class Project(models.Model):
    project_name = models.CharField(max_length=64)
    repository_url = models.URLField()
    users = models.ManyToManyField(Users)


class TODO(models.Model):
    project_name = models.ForeignKey(Project, models.PROTECT)
    text_to_do = models.TextField(null=True)
    create_or_update = models.DateField(default=date.today())
    user = models.ForeignKey(Users, models.PROTECT)
    is_active = models.BooleanField(default=False)
