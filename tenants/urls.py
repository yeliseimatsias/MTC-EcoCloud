from django.urls import path
from . import views

app_name = 'tenants'

urlpatterns = [
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/user/', views.current_user_view, name='current-user'),
]