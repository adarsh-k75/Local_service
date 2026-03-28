from django.urls import path,include
from . import views
urlpatterns = [
   path("booking/",views.BookingView.as_view()),
   path("status_update/<int:id>/",views.UpdateStatus.as_view()),
   path("Biling/<int:id>/",views.Addbill.as_view())

]
