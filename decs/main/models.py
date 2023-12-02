import os

from django.db import models
from django.contrib.auth import get_user_model
import uuid
from datetime import datetime

from accounts.models import Profile

User = get_user_model()


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=25)
    description = models.CharField(max_length=70, blank=True)
    date = models.DateTimeField(default=datetime.now)

    def user_profile_img(self):
        # Получаем профиль пользователя
        profile = Profile.objects.get(user=self.user)
        return profile.profile_img.url if profile.profile_img else ''

    def post_image_path(instance, filename):
        extension = os.path.splitext(filename)[1]

        return f'post_images/{instance.user.username}/{instance.id}{extension}'

    post_img = models.ImageField(upload_to=post_image_path)

    def __str__(self):
        return self.user.username
