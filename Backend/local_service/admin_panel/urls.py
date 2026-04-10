from django.urls import path,include
from . import views


urlpatterns = [
    path("User_only/",views.Allusers.as_view() ),
    path("Block_user/<int:id>/",views.BlockuserandList.as_view()),
    path("All_provider/",views.Allprovider.as_view()),
    path("verfication/<int:id>/",views.verify_id.as_view()),
    path("provider_request/<int:id>/",views.Provider_booking.as_view()),
    path("Dashboarc_count/",views.Countes.as_view()),


]