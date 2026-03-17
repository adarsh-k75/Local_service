from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path("service_catgory/",views.ServicesCatagory.as_view()),
    path("subcatgoy/<int:id>/",views.SubServices.as_view()),
    path("ProviderServices/",views.ProviderServices.as_view()),
    path("user_provider_view/<int:id>/",views.UserProviderView.as_view())
]
