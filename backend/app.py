from flask import Flask
from flask_login import LoginManager
from dataBase import DataBase
from flask_cors import CORS
from auth import auth
from User import User

db = DataBase()
users = db.getUsers()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = '39d76dff06e14b0b9c7bedca6f76e938'

    # login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from taskController import task as task_blueprint
    app.register_blueprint(task_blueprint)

    return app
    
@login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our user table, use it in the query for the user
    user = users.find_one({"id" : int(user_id)})
    return User(user["name"], user["email"], user["password"], int(user_id))