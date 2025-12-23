from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    path('log_in/', views.log_in, name='log_in'),
    path('sign_up/', views.sign_up, name='sign_up'),
    path('cart/', views.cart, name='cart'),
    path('men/', views.men, name='men'),
    path('women/', views.women, name='women'),
    path('kid/', views.kid, name='kid'),
    path('payment/', views.payment, name='payment'),
    path('delivery/', views.delivery, name='delivery'),
    path('thankyou/', views.thankyou, name='thankyou'),
    path('profile/', views.profile, name='profile'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]