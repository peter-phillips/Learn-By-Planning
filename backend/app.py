from flask import Flask
from flask_login import LoginManager
from dataBase import DataBase
from flask_cors import CORS
from auth import auth
from User import User



def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
    
    db = DataBase()
    users = db.getUsers()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        user = users.find_one({"id" : user_id})
        return User(user["name"], user["email"], user["password"], user_id)

    # blueprint for auth routes in our app
    from auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    return app
    