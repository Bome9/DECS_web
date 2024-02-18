from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User, auth
from accounts.models import Profile, UserData
from main.models import Post, LikePost, Followers
from django.contrib.auth.decorators import login_required
from itertools import chain
from django.http import JsonResponse


def main(request):
    return render(request, 'main/home.html')


def inspiration(request):
    return render(request, 'main/inspiration_page.html')


@login_required(login_url='login')
def like_post(request):
    username = request.user.username
    post_id = request.GET.get('post_id')

    post = Post.objects.get(id=post_id)

    like_filter = LikePost.objects.filter(post_id=post_id, username=username).first()

    if like_filter is None:
        new_like = LikePost.objects.create(post_id=post_id, username=username)
        new_like.save()
        post.num_of_likes = post.num_of_likes + 1
        post.save()
        return JsonResponse({'num_of_likes': post.num_of_likes})
    else:
        like_filter.delete()
        post.num_of_likes = post.num_of_likes - 1
        post.save()
        return JsonResponse({'num_of_likes': post.num_of_likes})


def post(request, post_id):
    post_objects = get_object_or_404(Post, id=post_id)
    author_profile = Profile.objects.get(user=post_objects.user)
    user_profile = Profile.objects.get(user=request.user)

    context = {
        'post_objects': post_objects,
        'user_profile': user_profile,
        'author_profile': author_profile,
    }
    return render(request, 'main/post_page.html', context)


@login_required(login_url='login')
def follow(request):
    if request.method == 'POST':
        follower = request.POST['follower']
        user = request.POST['user']

        if Followers.objects.filter(follower=follower, user=user).first():
            delete_follower = Followers.objects.get(follower=follower, user=user)
            delete_follower.delete()
            return redirect('/profile/' + user)
        else:
            new_follower = Followers.objects.create(follower=follower, user=user)
            new_follower.save()
            return redirect('/profile/' + user)
    else:
        return redirect('profile')


@login_required(login_url='login')
def upload(request):
    if request.method == 'POST':

        # user = request.user.username
        post_img = request.FILES.get('image_upload')
        title = request.POST['post_title']
        description = request.POST['post_description']

        if title and post_img:
            new_post = Post.objects.create(user=request.user, post_img=post_img, title=title, description=description)
            new_post.save()

        return redirect('publications')
    else:
        return redirect('publications')


@login_required(login_url='login')
def search(request):
    username_profile_list = []

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        if not username:
            pass
        else:
            username_objects = User.objects.filter(username__icontains=username)

            for user in username_objects:
                profile = Profile.objects.get(user=user)
                followers_count = Followers.objects.filter(user=user.username).count()
                publications_count = Post.objects.filter(user=user.id).count()
                user_data = {
                    'user': user,
                    'profile': profile,
                    'followers_count': followers_count,
                    'publications_count': publications_count,
                }
                username_profile_list.append(user_data)

    return render(request, 'main/search_page.html',
                  {'username_profile_list': username_profile_list, 'username': username,
                   'results_count': len(username_profile_list)})


@login_required(login_url='login')
def publications(request):
    user_profile = Profile.objects.get(user=request.user)
    posts = Post.objects.all()
    liked_posts = LikePost.objects.filter(username=request.user.username).values_list('post_id', flat=True)

    context = {
        'user_profile': user_profile,
        'posts': posts,
        'liked_posts': liked_posts,
    }

    return render(request, 'main/publications_page.html', context)


@login_required(login_url='login')
def feed(request):
    user_profile = Profile.objects.get(user=request.user)

    user_following_list = []
    feed_list = []

    user_following = Followers.objects.filter(follower=request.user.username)

    for users in user_following:
        user_following_list.append(users.user)

    for usernames in user_following_list:
        feed_lists = Post.objects.filter(user__username=usernames)
        feed_list.append(feed_lists)

    all_feed = list(chain(*feed_list))
    return render(request, 'main/feed_page.html', {'user_profile': user_profile, 'posts': all_feed})


@login_required(login_url='login')
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


@login_required(login_url='login')
def profile(request, pk):
    user_object = get_object_or_404(User, username=pk)
    user_profile = Profile.objects.get(user=user_object)
    posts = Post.objects.filter(user=user_object.pk)
    likes = LikePost.objects.filter(username=user_object.username)
    post_length = len(posts)
    like_length = len(likes)

    follower = request.user.username
    user = pk

    if Followers.objects.filter(follower=follower, user=user).first():
        button_text = 'Отписаться'
    else:
        button_text = 'Подписаться'

    user_followers = len(Followers.objects.filter(user=pk))

    context = {
        'user_object': user_object,
        'user_profile': user_profile,
        'posts': posts,
        'post_length': post_length,
        'like_length': like_length,
        'button_text': button_text,
        'user_followers': user_followers,
    }

    print(user_object)
    return render(request, 'main/profile_page.html', context)


@login_required(login_url='login')
def delete_post(request, post_id):
    post = get_object_or_404(Post, id=post_id, user=request.user)
    if post.user == request.user:
        post.delete()
    return redirect('profile', pk=request.user.username)
