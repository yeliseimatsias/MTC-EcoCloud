import uuid
from django.db import models
from django.contrib.auth.models import User  # Встроенная таблица с Email и Паролем

class Tenant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # МОСТИК к юзеру (логин/пароль)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tenant')
    
    # Поля организации
    name = models.CharField(max_length=255, verbose_name="Название компании")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class VirtualMachine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # СВЯЗЬ: ВМ принадлежит конкретному Тенанту
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='vms')
    
    name = models.CharField(max_length=100, verbose_name="Имя ВМ")
    
    # ПРИОРИТЕТЫ (Эко или Обычный)
    PRIORITY_CHOICES = [
        ('ECO', 'Эко-режим (Низкий приоритет)'),
        ('STD', 'Стандартный'),
        ('PRM', 'Максимум (Высокий приоритет)'),
    ]
    priority = models.CharField(max_length=3, choices=PRIORITY_CHOICES, default='STD')
    
    cpu = models.IntegerField(default=1)
    ram = models.IntegerField(default=2)

    def __str__(self):
        return f"{self.name} ({self.priority})"