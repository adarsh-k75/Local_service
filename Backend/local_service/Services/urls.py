from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path("service_catgory/",views.ServicesCatagory.as_view()),
    path("subcatgoy/<int:id>/",views.SubServices.as_view()),
    path("ProviderServices/",views.ProviderServices.as_view()),
    path("user_provider_view/<int:id>/",views.Get_near_provider.as_view()),
    path("search/",views.Search.as_view()),
    path("Subservice/",views.Subservice_navbar.as_view()),
    path('service_provider/',views.Service_provider.as_view())

    
]
