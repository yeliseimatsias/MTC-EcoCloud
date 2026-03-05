from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer

class UserListAPIView(APIView):
    def get(self, request):
        # Достаем всех пользователей из базы
        users = CustomUser.objects.all()
        # Пропускаем их через сериализатор
        serializer = UserSerializer(users, many=True)
        # Возвращаем JSON
        return Response(serializer.data)