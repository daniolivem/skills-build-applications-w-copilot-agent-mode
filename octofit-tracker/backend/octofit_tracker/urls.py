"""
URL configuration for octofit_tracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core import views
from rest_framework.response import Response
from rest_framework.decorators import api_view

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activity', views.ActivityViewSet)
router.register(r'leaderboard', views.LeaderboardViewSet)
router.register(r'workouts', views.WorkoutViewSet)

@api_view(['GET'])
def api_root(request, format=None):
    codespace_url = 'https://[REPLACE-THIS-WITH-YOUR-CODESPACE-NAME]-8000.app.github.dev/api/'
    localhost_url = 'http://localhost:8000/api/'
    return Response({
        'users_codespace': codespace_url + 'users/',
        'teams_codespace': codespace_url + 'teams/',
        'activity_codespace': codespace_url + 'activity/',
        'leaderboard_codespace': codespace_url + 'leaderboard/',
        'workouts_codespace': codespace_url + 'workouts/',
        'users_localhost': localhost_url + 'users/',
        'teams_localhost': localhost_url + 'teams/',
        'activity_localhost': localhost_url + 'activity/',
        'leaderboard_localhost': localhost_url + 'leaderboard/',
        'workouts_localhost': localhost_url + 'workouts/',
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', api_root, name='api-root'),
]
