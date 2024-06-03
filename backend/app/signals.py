from django.db.models.signals import post_save ,post_delete
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile  , Cartitems

from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()

@receiver(user_logged_in)
def restore_user_profile(sender, user, request, **kwargs):
    try:
        profile = UserProfile.objects.get(user=user)
        if profile.is_deleted():
            profile.restore()
    except UserProfile.DoesNotExist:
        pass

#password reset

from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    email_plaintext_message = f"Use the link below to reset your password:\n{settings.FRONTEND_URL}/reset-password/{reset_password_token.key}/"

    send_mail(
        # title:
        "Password Reset for {title}".format(title="bestglobeshop"),
        # message:
        email_plaintext_message,
        # from:
        settings.DEFAULT_FROM_EMAIL,
        # to:
        [reset_password_token.user.email]
    )



@receiver(post_save, sender=Cartitems)
@receiver(post_delete, sender=Cartitems)
def update_cart_grand_total(sender, instance, **kwargs):
    instance.cart.calculate_grand_total()