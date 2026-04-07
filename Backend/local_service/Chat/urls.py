from django.urls import path
from .views import ChatHistoryView
from django.http import HttpResponse
urlpatterns = [
    path("history/<int:other_user_id>/", ChatHistoryView.as_view()),

]