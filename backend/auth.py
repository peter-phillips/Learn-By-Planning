"""handles the authentication of Users"""
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user
from database import DataBase
from user import User


auth = Blueprint('auth', __name__)
users = DataBase.get_users()


@auth.route('/login', methods=['POST'])
def login_post():
    """Login a user from API post call with povided email and password"""
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
    if not check_password_hash(user.password, password):
        resp = jsonify(success=False)
        resp.status_code = 403 #Wrong username/password
        return resp
    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=True)
    user.login()
    resp = jsonify(success=True)
    resp.status_code = 202 #accepted http
    return resp

@auth.route('/signup', methods=['POST'])
def signup_post():
    """Signup a user from API post call with povided email, password and name"""
    args = request.get_json()
    email = args.get('email')
    password = args.get('password')
    name = args.get('name')
    user = users.find_one({"email" : email})

    if user is not None: # User with email already exists
        resp = jsonify(success=False)
        resp.status_code = 409 #conflict http
        return resp

    new_id = users.find().sort([("id", -1)]).limit(1)[0]["id"]
    # create new user with the form data. Hash the password so plaintext version isn't saved.
    new_user = User(name=name,
                    email=email,
                    password=generate_password_hash(password, method='sha256'),
                    uid=new_id + 1)

    # add the new user to the database
    users.insert_one({"id": new_user.uid,
                        "name": new_user.name,
                        "email": new_user.email,
                        "password": new_user.password})
    resp = jsonify(success=True)
    resp.status_code = 201 #Created http
    return resp

#NOTE NOT BEING USED BY FRONTEND
@auth.route('/logout', methods=['POST'])
def logout():
    """Logout current user from API get call"""
    user = User.current_user()
    if user is not None:
        logout_user()
        user.logout()
        resp = jsonify(success=True)
        resp.status_code = 200 #OK http
        return resp
    resp = jsonify(success=False)
    resp.status_code = 304 #Http not modified
    return resp
