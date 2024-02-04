from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='home'),
    path('inspiration/', views.inspiration, name='inspiration'),
    path('upload/', views.upload, name='upload'),
    path('follow', views.follow, name='follow'),
    path('like_post/', views.like_post, name='like_post'),
    path('publications/', views.publications, name='publications'),
    path('feed/', views.feed, name='feed'),
    path('settings/', views.settings, name='settings'),
    path('profile/<str:pk>', views.profile, name='profile'),
    path('delete_post/<uuid:post_id>/', views.delete_post, name='delete_post'),
]
