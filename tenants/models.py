import uuid
from django.db import models
from django.contrib.auth.models import User, AbstractUser  # Встроенная таблица с Email и Паролем


class CustomUser(AbstractUser):
    # Поля id, password, is_active и date_joined (created_at) уже встроены в AbstractUser!
    # Нам нужно только добавить email (сделать его уникальным) и организацию.

    email = models.EmailField(unique=True, verbose_name="Email")
    organization_name = models.CharField(max_length=255, verbose_name="Название организации")

    # Мы можем переопределить username, чтобы использовать email для логина (по желанию)
    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['organization_name']

    def __str__(self):
        return self.username

class VirtualMachine(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # СВЯЗЬ: ВМ принадлежит конкретному Тенанту
    tenant = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='vms')
    
    name = models.CharField(max_length=100, verbose_name="Имя ВМ")
    status = models.CharField(max_length=50, default="stopped", verbose_name="Статус")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    
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

class ResourceLimit(models.Model):
    # Связь один-к-одному с таблицей ВМ (у одной ВМ одни лимиты)
    vm = models.OneToOneField(VirtualMachine, on_delete=models.CASCADE, related_name='limits', verbose_name="Виртуальная машина")
    cpu_cores = models.PositiveIntegerField(verbose_name="Ядра CPU")
    ram_mb = models.PositiveIntegerField(verbose_name="RAM (МБ)")
    disk_gb = models.PositiveIntegerField(verbose_name="Диск (ГБ)")

    def __str__(self):
        return f"Лимиты для {self.vm.name}: {self.cpu_cores}CPU / {self.ram_mb}MB / {self.disk_gb}GB"