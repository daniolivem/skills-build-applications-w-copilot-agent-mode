import pymongo
from datetime import datetime

# Conexão com o MongoDB
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['octofit_db']

# Limpa coleções para evitar duplicidade
for col in ['users', 'teams', 'workouts', 'activity', 'leaderboard']:
    db[col].delete_many({})

# Usuários de teste
users = [
    {"email": "alice@example.com", "name": "Alice", "password": "123456", "created_at": datetime.now()},
    {"email": "bob@example.com", "name": "Bob", "password": "123456", "created_at": datetime.now()},
    {"email": "carol@example.com", "name": "Carol", "password": "123456", "created_at": datetime.now()}
]
user_ids = db.users.insert_many(users).inserted_ids

# Times de teste
teams = [
    {"name": "Team Alpha", "members": [user_ids[0], user_ids[1]], "created_at": datetime.now()},
    {"name": "Team Beta", "members": [user_ids[2]], "created_at": datetime.now()}
]
team_ids = db.teams.insert_many(teams).inserted_ids

# Workouts de teste
workouts = [
    {"name": "Corrida", "description": "Correr 5km", "created_at": datetime.now()},
    {"name": "Flexão", "description": "3 séries de 15 repetições", "created_at": datetime.now()}
]
workout_ids = db.workouts.insert_many(workouts).inserted_ids

# Atividades de teste
activities = [
    {"user": user_ids[0], "workout": workout_ids[0], "duration": 30, "date": datetime(2025, 6, 20), "points": 50},
    {"user": user_ids[1], "workout": workout_ids[1], "duration": 20, "date": datetime(2025, 6, 19), "points": 30},
    {"user": user_ids[2], "workout": workout_ids[0], "duration": 25, "date": datetime(2025, 6, 18), "points": 40}
]
db.activity.insert_many(activities)

# Leaderboard de teste
leaderboard = [
    {"user": user_ids[0], "team": team_ids[0], "points": 50, "updated_at": datetime.now()},
    {"user": user_ids[1], "team": team_ids[0], "points": 30, "updated_at": datetime.now()},
    {"user": user_ids[2], "team": team_ids[1], "points": 40, "updated_at": datetime.now()}
]
db.leaderboard.insert_many(leaderboard)

print("Banco de dados populado com sucesso!")
