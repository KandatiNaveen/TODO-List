from rest_framework import serializers
from .models import Board, Task
from django.contrib.auth.models import User
from rest_framework import serializers


from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['name']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['board', 'title', 'disp', 'status']
