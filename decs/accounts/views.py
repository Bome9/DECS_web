from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.shortcuts import render, redirect
from accounts.models import Profile, UserData


# Create your views here.

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Такая почта уже занята')
                return redirect('register')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Такой логин уже занят')
                return redirect('register')
            else:
                # Create user
                user = User.objects.create_user(username=username, email=email, password=password)

                # Create UserData for the new user
                user_data = UserData.objects.create(user=user, username=username, email=email, password=password)
                # Добавьте необходимые данные в объект UserData, если это необходимо

                # Create Profile for the new user
                new_profile = Profile.objects.create(user=user)
                new_profile.save()

                # log user in and direct to settings page
                user_login = auth.authenticate(username=username, password=password)
                auth.login(request, user_login)

                return redirect('settings')
        else:
            messages.info(request, 'Пароли не совпадают')
            return redirect('register')

    else:
        return render(request, 'accounts/register_page.html')


def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'Пользователь не найден')
            return redirect('login')
    else:
        return render(request, 'accounts/login_page.html')


def logout(request):
    auth.logout(request)
    return redirect('login')