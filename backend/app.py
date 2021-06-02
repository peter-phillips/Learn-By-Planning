"""Creates backend flask application"""
from flask import Flask
from flask_login import LoginManager
from database import DataBase
from flask_cors import CORS
from user import User
from auth import auth as auth_blueprint
from task_controller import task as task_blueprint

users = DataBase.get_users()
login_manager = LoginManager()

def create_app():
    """creates flask application"""
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = '39d76dff06e14b0b9c7bedca6f76e938'

    # login_manager.login_view = 'auth.login'
    #NOTE LOGIN MANAGER NOT REALLY BEING USED PROPERLY, USED ONLY FOR LOGIN
    login_manager.init_app(app)

    # blueprint for auth routes in our app
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(task_blueprint)

    return app

@login_manager.user_loader
def load_user(user_id):
    """loads a user for flask_login"""
    #since the user_id is just the primary key of our user table, use it in the query for the user
    user = users.find_one({"id" : int(user_id)})
    return User(user["name"], user["email"], user["password"], int(user_id))
