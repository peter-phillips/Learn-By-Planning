from datetime import datetime, date
from flask import Blueprint, jsonify, request
from User import User
from dataBase import DataBase
from Task import Task
import sys


task = Blueprint('task', __name__)
db = DataBase()
tasks = db.getTasks()

#Create a task
@task.route('/Today', methods=['POST'])
@task.route('/List', methods=['POST'])
@task.route('/Calendar', methods=['POST'])
def taskPost():
    # if no one logged in
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    #grabs args from post
    args = request.form
    name = args.get('name')
    desc = args.get('desc')
    clas = args.get('class')
    dueDate = args.get('dueDate')
    targetDate = args.get('targetDate')
    remind = args.get('remind')
    remindDate = args.get('remindDate')

    #finds highest task id
    new_id = tasks.find().sort([("taskId", -1)]).limit(1)[0]["taskId"]
    # user = flask_login.current_user

    task = Task(new_id + 1, user.uid, name, desc, clas, 
            datetime.strptime(dueDate, '%m-%d-%Y %I:%M %p'), 
            datetime.strptime(targetDate, '%m-%d-%Y %I:%M %p'), 
            remind, datetime.strptime(remindDate, '%m-%d-%Y %I:%M %p'))
    #inserts new task into mongo
    tasks.insert_one(task.toMongo())
    #sets return
    resp = jsonify(success=True)
    resp.status_code = 201 #created http code
    return resp

# Delete a task
@task.route('/Today', methods=['DELETE'])
@task.route('/List', methods=['DELETE'])
@task.route('/Calendar', methods=['DELETE'])
def taskDelete():
    # if no one logged in
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    args = request.get_json()
    taskId = args.get('taskId')
    task = tasks.find_one({"taskId" : taskId})
    if len(list(task)) == 0:
        resp = jsonify(success=False)
        resp.status_code = 400 #bad request
        return resp
        
    tasks.delete_one({"taskId" : taskId})
    resp = jsonify(success=True)
    resp.status_code = 200 #OK
    return resp
    
# Update a task
@task.route('/Today', methods=['PUT'])
@task.route('/List', methods=['PUT'])
@task.route('/Calendar', methods=['PUT'])
def taskPut():
    # if no one logged in
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    args = request.get_json()
    taskId = args.get('taskId')
    task = tasks.find_one({"taskId" : taskId})
    if len(list(task)) == 0:
        resp = jsonify(success=False)
        resp.status_code = 400 #bad request
        return resp
    
    name = args.get('name')
    desc = args.get('desc')
    clas = args.get('class')
    dueDate = datetime.strptime(args.get('dueDate'), '%m-%d-%Y %I:%M %p')
    targetDate = datetime.strptime(args.get('targetDate'), '%m-%d-%Y %I:%M %p')
    remind = args.get('remind')
    remindDate = datetime.strptime(args.get('remindDate'), '%m-%d-%Y %I:%M %p')
    tasks.update_one({"taskId" : taskId},
                        {"$set": {
                            "name" : name,
                            "desc" : desc,
                            "class" : clas,
                            "dueDate" : dueDate,
                            "targetDate" : targetDate,
                            "remind" : remind,
                            "remindDate" : remindDate
                        }})
    resp = jsonify(success=True)
    resp.status_code = 200 #OK
    return resp

@task.route('/Today', methods=['GET'])
def todayGet():
    # if no one logged in
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    current = datetime.now()
    start = datetime(current.year, current.month, current.day)
    end = datetime(current.year, current.month, current.day, hour=23, minute=59, second=59)
    today_tasks = tasks.find({"$and": [{"dueDate" : {"$gte" : start , "$lte" : end}}, {"userId" : user.uid}]})
    target_tasks = tasks.find({"$and": [{"targetDate" : {"$gte" : start , "$lte" : end}}, {"userId" : user.uid}]})
    ltasks = list(today_tasks)
    ltarget = list(target_tasks)
    tempIds = []
    for i in ltasks:
        i.pop("_id")
        i["isTarget"] = False
        tempIds.append(i.get("taskId"))
    
    for j in ltarget:
        if j.get("taskId") not in tempIds:
            j.pop("_id")
            j["isTarget"] = True
            ltasks.append(j)
    
    ltasks.sort(key=lambda x: x.get('dueDate'))
    resp = jsonify(success=True, tasks=ltasks)
    resp.status_code = 201
    return resp

@task.route('/List', methods=['GET'])
def listGet():
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    listTasks = list(tasks.find({"userId" : user.uid}))
    for i in listTasks:
        i.pop("_id")
    listTasks.sort(key=lambda x: x.get('dueDate'))
    resp = jsonify(success=True, tasks=listTasks)
    resp.status_code = 201
    return resp
    