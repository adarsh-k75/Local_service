from django.urls import path,include
from .import views
urlpatterns = [
    path('register/', views.RegisterLogic.as_view()),
    path('login/', views.LoginLogic.as_view()),
    path('Navbar/',views.Navbarname.as_view())

]
