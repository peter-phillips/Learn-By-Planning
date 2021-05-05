from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from dataBase import DataBase
from User import User
import sys


auth = Blueprint('auth', __name__)
db = DataBase()
users = db.getUsers()

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False

    user = users.find_one({"email" : email})

    # check if user actually exists
    # take the user supplied password, hash it, and compare it to the hashed password in database
    if user is None:
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # if user doesn't exist or password is wrong, reload the page
    user = User(user["name"], user["email"], user["password"], user["id"])
    if not(check_password_hash(user.password, password)):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login'))
    # if the above check passes, then we know the user has the right credentials
    login_user(user, remember=remember)
    return redirect(url_for('main.profile'))

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=['POST'])
def signup_post():

    email = request.form.get('email')
    name = request.form.get('name')
    password = request.form.get('password')

    user = users.find_one({"email" : email}) # if this returns a user, then the email already exists in database

    if user is not None: # if a user is found, we want to redirect back to signup page so user can try again  
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))

    new_id = users.find().sort([("id", -1)]).limit(1)[0]["id"]
    # create new user with the form data. Hash the password so plaintext version isn't saved.
    new_user = User(name=name, email=email, password=generate_password_hash(password, method='sha256'), uid=new_id + 1)

    # add the new user to the database
    users.insert_one({"id": new_user.uid, "name": new_user.name, "email": new_user.email, "password": new_user.password})


    return redirect(url_for('auth.login'))

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))
