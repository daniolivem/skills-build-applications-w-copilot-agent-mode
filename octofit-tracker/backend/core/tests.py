from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(email='test@example.com', name='Test User', password='123456')
        self.assertEqual(user.email, 'test@example.com')

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Team A')
        self.assertEqual(team.name, 'Team A')

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Pushups', description='Do pushups')
        self.assertEqual(workout.name, 'Pushups')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(email='a@a.com', name='A', password='123')
        workout = Workout.objects.create(name='Run', description='Running')
        activity = Activity.objects.create(user=user, workout=workout, duration=30, date='2025-06-20', points=10)
        self.assertEqual(activity.duration, 30)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        user = User.objects.create(email='b@b.com', name='B', password='123')
        team = Team.objects.create(name='Team B')
        leaderboard = Leaderboard.objects.create(user=user, team=team, points=100)
        self.assertEqual(leaderboard.points, 100)
