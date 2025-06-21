import pymongo
from pprint import pprint

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['octofit_db']

print('Coleções disponíveis:')
print(db.list_collection_names())

print('\nUsuários:')
for doc in db.users.find():
    pprint(doc)

print('\nTimes:')
for doc in db.teams.find():
    pprint(doc)

print('\nWorkouts:')
for doc in db.workouts.find():
    pprint(doc)

print('\nAtividades:')
for doc in db.activity.find():
    pprint(doc)

print('\nLeaderboard:')
for doc in db.leaderboard.find():
    pprint(doc)
