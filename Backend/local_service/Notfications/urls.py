from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('Bookin_view/', views.Bookingview.as_view()),
    path('Bookin_deatils/<int:id>/',views.Bookingdeatils.as_view()),
    path('notifications/', views.Notfications.as_view()),
    path('unread-count/', views.Unread_count.as_view()),
    path('mark-read/', views.Mark_read.as_view()),

    
]