from django.http import HttpResponse
from django.shortcuts import render, redirect

from django.contrib.auth.models import User, auth
from accounts.models import Profile, UserData
from main.models import Post


# Create your views here.


def main(request):
    return render(request, 'main/home.html')


def inspiration(request):
    return render(request, 'main/inspiration_page.html')


def upload(request):

    if request.method == 'POST':
        print(request.FILES)
        print(request.POST)

        # user = request.user.username
        post_img = request.FILES.get('image_upload')
        title = request.POST['post_title']
        description = request.POST['post_description']

        if title and post_img:
            new_post = Post.objects.create(user=request.user, post_img=post_img, title=title, description=description)
            new_post.save()

        return redirect('/')
    else:
        return redirect('/')


def publications(request):
    user_profile = Profile.objects.get(user=request.user)

    posts = Post.objects.all()
    return render(request, 'main/publications_page.html', {'user_profile': user_profile, 'posts': posts})


def settings(request):
    user_profile = Profile.objects.get(user=request.user)

    if request.method == 'POST':

        if request.method == 'POST':
            if 'profile_img' in request.FILES:
                user_profile.profile_img = request.FILES['profile_img']
            if 'cover_img' in request.FILES:
                user_profile.cover_img = request.FILES['cover_img']

            user_profile.bio = request.POST['bio']
            user_profile.skills = request.POST['skills']
            user_profile.achievements = request.POST['achievements']
            user_profile.location = request.POST['location']

            user_profile.save()
            return redirect('settings')

    return render(request, 'main/settings_page.html', {'user_profile': user_profile})


def profile_bio(request):
    user_profile = Profile.objects.get(user=request.user)

    posts = Post.objects.filter(user=request.user)
    return render(request, 'main/profile_bio_page.html', {'user_profile': user_profile, 'posts': posts})

