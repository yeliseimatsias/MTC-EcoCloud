from rest_framework import serializers
from .models import CustomUser, VirtualMachine, ResourceLimit


# 1. Сериализатор для лимитов (самый простой)
class ResourceLimitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceLimit
        fields = ['cpu_cores', 'ram_mb', 'disk_gb']


# 2. Сериализатор для ВМ
class VirtualMachineSerializer(serializers.ModelSerializer):
    # Мы можем "вложить" лимиты прямо внутрь объекта ВМ
    limits = ResourceLimitSerializer(read_only=True)

    class Meta:
        model = VirtualMachine
        fields = ['id', 'name', 'ip_address', 'status', 'created_at', 'limits']


# 3. Сериализатор для Пользователя
class UserSerializer(serializers.ModelSerializer):
    # Позволяет увидеть список ВМ пользователя прямо в данных юзера
    vms = VirtualMachineSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'organization_name', 'vms']