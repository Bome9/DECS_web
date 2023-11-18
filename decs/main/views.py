from django.shortcuts import render, redirect

from accounts.models import Profile


# Create your views here.


def main(request):
    return render(request, 'main/home.html')


def publications(request):
    return render(request, 'main/publications_page.html')


def settings(request):
    user_profile = Profile.objects.get(user=request.user)

    if request.method == 'POST':

        if request.method == 'POST':
            if 'profile_img' in request.FILES:
                user_profile.profileimg = request.FILES['profile_img']
            if 'cover_img' in request.FILES:
                user_profile.coverimg = request.FILES['cover_img']

            user_profile.bio = request.POST['bio']
            user_profile.skills = request.POST['skills']
            user_profile.achievements = request.POST['achievements']
            user_profile.location = request.POST['location']

            user_profile.save()
            return redirect('settings')

    return render(request, 'main/settings_page.html', {'user_profile': user_profile})


def profile_bio(request):
    user_profile = Profile.objects.get(user=request.user)
    return render(request, 'main/profile_bio_page.html', {'user_profile': user_profile})

