from django.contrib import admin
from main.models import Post, LikePost, Followers, Category

# Register your models here.

admin.site.register(Post)
admin.site.register(LikePost)
admin.site.register(Followers)
admin.site.register(Category)