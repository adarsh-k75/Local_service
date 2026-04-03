from django.urls import path,include
from . import views
urlpatterns = [
   path('create-order/',views.CreateOrderView.as_view()),
   path('verify-payment/',views.VerifyPaymentView.as_view()),
]