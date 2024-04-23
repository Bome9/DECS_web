from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='home'),
    path('inspiration/', views.inspiration, name='inspiration'),
    path('filter/<str:category_name>/', views.filter_by_category, name='filter_by_category'),
    path('upload/', views.upload, name='upload'),
    path('search', views.search, name='search'),
    path('post/<uuid:post_id>/', views.post, name='post'),
    path('delete_post/<uuid:post_id>/', views.delete_post, name='delete_post'),
    path('comment/', views.comment, name='comment'),
    path('delete_comment/', views.delete_comment, name='delete_comment'),
    path('follow', views.follow, name='follow'),
    path('like_post/', views.like_post, name='like_post'),
    path('publications/', views.publications, name='publications'),
    path('feed/', views.feed, name='feed'),
    path('settings/', views.settings, name='settings'),
    path('profile/<str:pk>', views.profile, name='profile'),
]
