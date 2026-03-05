from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import login, logout
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """
    Регистрация нового пользователя
    Ожидает: {
        "email": "user@example.com",
        "organization_name": "Название организации",
        "password": "123",
        "password2": "123"
    }
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Автоматически логиним пользователя после регистрации
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Регистрация успешна'
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Вход пользователя
    Ожидает: {
        "email": "user@example.com",
        "password": "123"
    }
    """
    serializer = LoginSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Вход выполнен успешно'
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Выход пользователя
    """
    logout(request)
    return Response({'message': 'Выход выполнен успешно'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    """
    Получение информации о текущем пользователе
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)