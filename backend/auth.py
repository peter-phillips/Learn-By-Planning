from flask import Blueprint, jsonify, request
from dataBase import DataBase
from User import User
import app
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
    if len(list(user)) == 0:
        resp = jsonify(success=False)
        resp.status_code = 403 #Wrong username/password
        return resp # if user doesn't exist or password is wrong, reload the page
    user = User(user["id"], user["name"], user["email"], user["password"])
     # take the user supplied password, hash it, and compare it to the hashed password in database
    # if not(check_password_hash(user.password, password)):
    #     resp = jsonify(success=False)
    #     resp.status_code = 403 #Wrong username/password
    #     return resp
    # if the above check passes, then we know the user has the right credentials
    user = app.guard.authenticate(email, password)
    resp = jsonify(success=True, access_token=app.guard.encode_jwt_token(user))
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
    new_user = User(new_id + 1, name, email, app.guard.hash_password(password))

    # add the new user to the database
    users.insert_one({"id": new_user.id, "name": new_user.name, "email": new_user.email, "password": new_user.password})
    resp = jsonify(success=True)
    resp.status_code = 201 #Created http
    return resp

@auth.route('/refresh', methods=['POST'])
def refresh():
    old_token = request.get_data()
    new_token = app.guard.refresh_jwt_token(old_token)
    ret = jsonify(success=True, access_token=new_token)
    ret.status_code = 200
    return ret

# @auth.route('/login', methods=['GET'])
# def logout():
#     # if someone logged in
#     if current_user.is_authenticated:
#         logout_user()
#         resp = jsonify(success=True)
#         resp.status_code = 200 #OK http
#         return resp
#     resp = jsonify(success=False)
#     resp.status_code = 304 #Http not modified
#     return resp
