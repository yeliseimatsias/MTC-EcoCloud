from django.contrib import admin
from .models import Tenant, VirtualMachine

admin.site.register(Tenant)
admin.site.register(VirtualMachine)