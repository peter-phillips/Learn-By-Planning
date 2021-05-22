
from flask import Blueprint, jsonify, request
import flask_login
from dataBase import DataBase
from Task import Task



task = Blueprint('task', __name__)
db = DataBase()
tasks = db.getTasks()

@task.route('/today', methods=['POST'])
def taskPost():
    args = request.get_json()
    name = args.get('name')
    desc = args.get('description')
    dueDate = args.get('dueDate')
    targetDate = args.get('targetDate')
    remind = args.get('remind')
    remindDate = args.get('remindDate')
    
    pass

@task.route('/today', methods=['DELETE'])
def taskDelete():
    args = request.get_json()
    pass

@task.route('/today', methods=['PUT'])
def taskPut():
    args = request.get_json()
    pass

@task.route('/today', methods=['GET'])
def todayGet():
    pass
