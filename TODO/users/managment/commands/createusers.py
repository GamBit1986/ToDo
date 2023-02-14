from django.core.management.base import BaseCommand
from users.models import Users


class Command(BaseCommand):
    help = 'Create superuser and test users'

    def add_arguments(self, parser):
        parser.add_arguments('count', type=int)

    
    def handle(self, *args, **options):
        Users.objects.all().delete()
        user_count = options['count']

        Users.objects.create_superuser('superuser', 'superuser@mail.ru', '12345678')

        for i in range(user_count):
            Users.objects.create_user(f'user{i}', f'user{i}@test.com', '12345678')
        
        print('done')