

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
import pymongo
from bson import ObjectId

# Conexão direta com o MongoDB
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['octofit_db']

class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        users = list(db.users.find())
        for user in users:
            user['id'] = str(user['_id'])
            user.pop('_id', None)
        return Response(users)


# As demais ViewSets podem ser adaptadas para pymongo seguindo o exemplo do UserViewSet
