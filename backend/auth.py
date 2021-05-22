from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from dataBase import DataBase
from User import User
import sys


auth = Blueprint('auth', __name__)
db = DataBase()
users = db.getUsers()


@auth.route('/login', methods=['POST'])
def login_post():
    args = request.get_json()
    email = args.get('email')
    password = args.get('password')
    user = users.find_one({"email" : email})

    # check if user actually exists
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 403 #Wrong username/password
        return resp # if user doesn't exist or password is wrong, reload the page
    user = User(user["name"], user["email"], user["password"], user["id"])
     # take the user supplied password, hash it, and compare it to the hashed password in database
    if not(check_password_hash(user.password, password)):
        resp = jsonify(success=False)
        resp.status_code = 403 #Wrong username/password
        return resp
    # if the above check passes, then we know the user has the right credentials
    login_user(user)
    resp = jsonify(success=True)
    resp.status_code = 202 #accepted http
    return resp

@auth.route('/signup', methods=['POST'])
def signup_post():
    args = request.get_json()
    email = args.get('email')
    password = args.get('password')
    name = args.get('name')
   

    user = users.find_one({"email" : email}) # if this returns a user, then the email already exists in database

    if user is not None: # User with email already exists
        resp = jsonify(success=False)
        resp.status_code = 409 #conflict http
        return resp

    new_id = users.find().sort([("id", -1)]).limit(1)[0]["id"]
    # create new user with the form data. Hash the password so plaintext version isn't saved.
    new_user = User(name=name, email=email, password=generate_password_hash(password, method='sha256'), uid=new_id + 1)

    # add the new user to the database
    users.insert_one({"id": new_user.uid, "name": new_user.name, "email": new_user.email, "password": new_user.password})
    resp = jsonify(success=True)
    resp.status_code = 201 #Created http
    return resp

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    resp = jsonify(success=True)
    resp.status_code = 200 #OK http
    return resp
