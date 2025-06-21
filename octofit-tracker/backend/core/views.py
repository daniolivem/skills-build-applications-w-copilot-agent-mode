

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

    def create(self, request):
        data = request.data
        if not data.get('name') or not data.get('email'):
            return Response({'error': 'Nome e email são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)
        user = {'name': data['name'], 'email': data['email']}
        result = db.users.insert_one(user)
        user['id'] = str(result.inserted_id)
        return Response(user, status=status.HTTP_201_CREATED)

class TeamViewSet(viewsets.ViewSet):
    def list(self, request):
        teams = list(db.teams.find())
        for team in teams:
            team['id'] = str(team['_id'])
            team.pop('_id', None)
        return Response(teams)

    def create(self, request):
        data = request.data
        if not data.get('name'):
            return Response({'error': 'Nome do time é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)
        team = {'name': data['name']}
        result = db.teams.insert_one(team)
        team['id'] = str(result.inserted_id)
        return Response(team, status=status.HTTP_201_CREATED)

class ActivityViewSet(viewsets.ViewSet):
    def list(self, request):
        activities = list(db.activity.find())
        for activity in activities:
            activity['id'] = str(activity['_id'])
            activity.pop('_id', None)
        return Response(activities)

    def create(self, request):
        data = request.data
        if not data.get('name'):
            return Response({'error': 'Nome da atividade é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)
        activity = {'name': data['name']}
        result = db.activity.insert_one(activity)
        activity['id'] = str(result.inserted_id)
        return Response(activity, status=status.HTTP_201_CREATED)

class LeaderboardViewSet(viewsets.ViewSet):
    def list(self, request):
        leaderboard = list(db.leaderboard.find())
        for entry in leaderboard:
            entry['id'] = str(entry['_id'])
            entry.pop('_id', None)
        return Response(leaderboard)

    def create(self, request):
        data = request.data
        if not data.get('name') or not data.get('score'):
            return Response({'error': 'Nome e pontuação são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)
        entry = {'name': data['name'], 'score': data['score']}
        result = db.leaderboard.insert_one(entry)
        entry['id'] = str(result.inserted_id)
        return Response(entry, status=status.HTTP_201_CREATED)

class WorkoutViewSet(viewsets.ViewSet):
    def list(self, request):
        workouts = list(db.workouts.find())
        for workout in workouts:
            workout['id'] = str(workout['_id'])
            workout.pop('_id', None)
        return Response(workouts)

    def create(self, request):
        data = request.data
        if not data.get('name'):
            return Response({'error': 'Nome do treino é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)
        workout = {'name': data['name']}
        result = db.workouts.insert_one(workout)
        workout['id'] = str(result.inserted_id)
        return Response(workout, status=status.HTTP_201_CREATED)


# As demais ViewSets podem ser adaptadas para pymongo seguindo o exemplo do UserViewSet
