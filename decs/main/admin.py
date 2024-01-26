from django.contrib import admin
from main.models import Post, LikePost

# Register your models here.

admin.site.register(Post)
admin.site.register(LikePost)