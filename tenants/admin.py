from django.contrib import admin
from .models import CustomUser, VirtualMachine

admin.site.register(CustomUser)
admin.site.register(VirtualMachine)