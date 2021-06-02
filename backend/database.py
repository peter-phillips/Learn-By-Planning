"""creates a connection to mongoDB database"""
import os
from dotenv import load_dotenv
import pymongo

class DataBase:
    """creates a connection to mongoDB database"""

    # disabling pylint for MONGODB_URI being invalid
    # pylint: disable=invalid-name
    #load_dotenv('./dataBaseAccess.env')
    MONGODB_URI = os.getenv('MONGODB_URI')
    client = pymongo.MongoClient(host=MONGODB_URI)
    db = client.LearnByPlanning

    @classmethod
    def get_users(cls):
        """Get user collection"""
        return cls.db.Users

    @classmethod
    def get_tasks(cls):
        """Get task collection"""
        return cls.db.Tasks

    @classmethod
    def get_classes(cls):
        """Get classes collection"""
        return cls.db.Classes

    @classmethod
    def get_notifications(cls):
        """Get notification collection"""
        return cls.db.Notifications
