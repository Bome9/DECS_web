from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='home'),
    path('inspiration/', views.inspiration, name='inspiration'),
    path('upload/', views.upload, name='upload'),
    path('publications/', views.publications, name='publications'),
    path('settings/', views.settings, name='settings'),
    path('profile_bio/', views.profile_bio, name='profile_bio'),
    path('delete_post/<uuid:post_id>/', views.delete_post, name='delete_post'),
]
