from django.urls import path,include
from .import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('register/', views.RegisterLogic.as_view()),
    path('login/', views.LoginLogic.as_view()),
    path('Navbar/',views.Navbarname.as_view()),
    path('profile/',views.Profile.as_view()),
    path('rsetpassword/',views.Reset_password.as_view()),
    path('logout/',views.Logout.as_view()),
    path('refresh/',views.Refrsh_token.as_view()),
    path("verify-email/<uidb64>/<token>/", views.VerifyEmail.as_view()),
    path("UserProfile/",views.Profileaddres.as_view()),
    

    path('google-login/', views.GoogleLoginAPIView.as_view()),

    path('forgot-password/', views.Forgett_password.as_view()),
    path('reset-password/<int:uid>/<str:token>/',views.Reset_password.as_view()),
]
