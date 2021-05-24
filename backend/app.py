from flask import Flask
from dataBase import DataBase
from flask_cors import CORS
from auth import auth
from User import User
import flask_praetorian

db = DataBase()
users = db.getUsers()
guard = flask_praetorian.Praetorian()


app = Flask(__name__)
CORS(app)
app.debug = True

app.config['SECRET_KEY'] = '39d76dff06e14b0b9c7bedca6f76e938'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
with app.app_context():
    guard.init_app(app, User)

# blueprint for auth routes in our app
from auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from taskController import task as task_blueprint
app.register_blueprint(task_blueprint)

