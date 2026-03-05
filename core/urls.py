from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('tenants.urls')),  # Все URL авторизации будут доступны по префиксу /api/auth/
]