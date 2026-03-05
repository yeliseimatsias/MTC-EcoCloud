from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'}, label='Подтверждение пароля')
    
    class Meta:
        model = CustomUser
        fields = ('email', 'organization_name', 'password', 'password2')
        extra_kwargs = {
            'organization_name': {'required': True}
        }
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Пароли не совпадают'})
        return data
    
    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError('Пользователь с таким email уже существует')
        return value
    
    def create(self, validated_data):
        # Удаляем password2 из данных
        validated_data.pop('password2')
        
        # Создаем пользователя
        user = CustomUser.objects.create_user(
            username=validated_data['email'],  # Используем email как username
            email=validated_data['email'],
            organization_name=validated_data['organization_name'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            # Пытаемся найти пользователя по email
            try:
                user = CustomUser.objects.get(email=email)
                # Аутентифицируем по username (который равен email)
                user = authenticate(
                    request=self.context.get('request'),
                    username=user.username,
                    password=password
                )
            except CustomUser.DoesNotExist:
                user = None
            
            if not user:
                raise serializers.ValidationError('Неверный email или пароль')
        else:
            raise serializers.ValidationError('Необходимо указать email и пароль')
        
        data['user'] = user
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'organization_name', 'date_joined', 'is_active')
        read_only_fields = ('id', 'date_joined', 'is_active')