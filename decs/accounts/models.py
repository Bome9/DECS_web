from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    achievements = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)

    def profile_image_path(instance, filename):
        return f'profile_images/{instance.user.username}/{filename}'

    profile_img = models.ImageField(upload_to=profile_image_path)

    def cover_image_path(instance, filename):
        return f'cover_images/{instance.user.username}/{filename}'

    cover_img = models.ImageField(upload_to=cover_image_path)

    def __str__(self):
        return self.user.username
