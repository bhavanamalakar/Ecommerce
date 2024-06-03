from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from app.models import UserProfile  # Adjust the import as needed

class Command(BaseCommand):
    help = 'Deletes user profiles that have been soft deleted for more than 60 days'

    def handle(self, *args, **kwargs):
        cutoff_date = timezone.now() - timedelta(days=60)
        profiles_to_delete = UserProfile.objects.filter(deleted_at__lt=cutoff_date)
        count = profiles_to_delete.count()
        profiles_to_delete.delete()
        self.stdout.write(self.style.SUCCESS(f'Deleted {count} user profiles'))
