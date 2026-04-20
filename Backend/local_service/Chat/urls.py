from django.urls import path
from .views import ChatHistoryView,ChatImageUpload
from django.http import HttpResponse
urlpatterns = [
    path("history/<int:other_user_id>/", ChatHistoryView.as_view()),
    path("chat_image/", ChatImageUpload.as_view()),

]