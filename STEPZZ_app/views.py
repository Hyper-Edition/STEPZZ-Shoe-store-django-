from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import SignUpForm, LoginForm

# Basic views
def index(request):
    return render(request, 'index.html')

def cart(request):
    return render(request, 'cart.html')

def men(request):
    return render(request, 'men.html')

def women(request):
    return render(request, 'women.html')

def kid(request):
    return render(request, 'kid.html')

def payment(request):
    return render(request, 'payment.html')

def delivery(request):
    return render(request, 'delivery.html')

def log_in(request):
    return render(request, 'log_in.html')

def sign_up(request):
    return render(request, 'sign_up.html')

def thankyou(request):
    return render(request, 'thankyou.html')

def contact(request):
    return render(request, 'contact.html')

def profile(request):
    return render(request, 'profile.html')

# Authentication views
def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Registration successful!')
            return redirect('index')
    else:
        form = SignUpForm()
    return render(request, 'sign_up.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'Welcome back, {username}!')
                return redirect('index')
    else:
        form = LoginForm()
    return render(request, 'log_in.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('index')