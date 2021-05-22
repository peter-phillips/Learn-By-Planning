
import os
from dotenv import load_dotenv
import pymongo

class DataBase:
    def __init__(self):
        load_dotenv('./dataBaseAccess.env')
        MONGODB_URI = os.getenv('MONGODB_URI')
        self.client = pymongo.MongoClient(MONGODB_URI)
        self.db = self.client.LearnByPlanning
    
    def getUsers(self):
        return self.db.Users
    
    def getTasks(self):
        return self.db.Tasks
