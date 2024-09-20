from django.urls import path
from .views import *

urlpatterns = [
    # Board APIs
    path('boards/', BoardListCreateAPIView.as_view(), name='board-list-create'),
    
    # Task APIs
    path('tasks/', TaskListCreateAPIView.as_view(), name='task-list-create'),

    path('tasks/<str:board_name>/', TaskByBoardNameAPIView.as_view(), name='task-by-board-name'),

    path('login/', LoginAPIView.as_view(), name='api_login'),
    path('api/register/', RegisterAPIView.as_view(), name='api_register'),
    path('api/logout/', LogoutAPIView.as_view(), name='api_logout'),
]
