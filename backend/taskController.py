from datetime import datetime, date
from flask import Blueprint, jsonify, request
from User import User
from dataBase import DataBase
from Task import Task
from classes import Classes
import sys


task = Blueprint('task', __name__)
db = DataBase()
tasks = db.getTasks()
classes = db.getClasses()

#Create a task
@task.route('/Today', methods=['POST'])
@task.route('/List', methods=['POST'])
@task.route('/Calendar', methods=['POST'])
def taskPost():
    """creates a new task in the database"""
    # if no one logged in
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    #grabs args from post
    args = request.get_json()
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
            datetime.strptime(dueDate, '%Y-%m-%dT%H:%M:%S.%fZ'),
            datetime.strptime(targetDate, '%Y-%m-%dT%H:%M:%S.%fZ'),
            remind, datetime.strptime(remindDate, '%Y-%m-%dT%H:%M:%S.%fZ'))
    #inserts new task into mongo
    tasks.insert_one(task.toMongo())
    print(args, file=sys.stderr)
    res_task = task.toMongo()
    res_task["color"] = classes.find_one({"$and" :
                                            [{"userId" : user.uid}, 
                                            {"className" : res_task.get("class")}]}).get("classColor")
    #sets return
    resp = jsonify(success=True, task=res_task)
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
    dueDate = datetime.strptime(args.get('dueDate'), '%Y-%m-%dT%H:%M:%S.%fZ')
    targetDate = datetime.strptime(args.get('targetDate'), '%Y-%m-%dT%H:%M:%S.%fZ')
    remind = args.get('remind')
    remindDate = datetime.strptime(args.get('remindDate'), '%Y-%m-%dT%H:%M:%S.%fZ')
    color = args.get('color')
    tasks.update_one({"taskId" : taskId},
                        {"$set": {
                            "name" : name,
                            "desc" : desc,
                            "class" : clas,
                            "dueDate" : dueDate,
                            "targetDate" : targetDate,
                            "remind" : remind,
                            "remindDate" : remindDate,
                            "color" : color
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
    user_classes = classes.find({"userId" : user.uid})
    ltasks = list(today_tasks)
    ltarget = list(target_tasks)
    lclasses = list(user_classes)
    tempclasses = []
    tempIds = []
    for i in ltasks:
        i.pop("_id")
        i["isTarget"] = False
        i["color"] = classes.find_one({"$and" : [{"userId" : user.uid}, {"className" : i.get("class")}]}).get("classColor")
        tempIds.append(i.get("taskId"))

    for j in ltarget:
        if j.get("taskId") not in tempIds:
            j.pop("_id")
            j["isTarget"] = True
            j["color"] = classes.find_one({"$and" : [{"userId" : user.uid}, {"className" : j.get("class")}]}).get("classColor")
            ltasks.append(j)

    for k in lclasses:
        k.pop("_id")
        k.pop("userId")
        tempclasses.append(k)

    tempclasses.sort(key=lambda x: x.get("className"))
    ltasks.sort(key=lambda x: x.get('dueDate'))
    resp = jsonify(success=True, tasks=ltasks, classes=tempclasses)
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
    user_classes = list(classes.find({"userId" : user.uid}))
    tempclasses = []
    for i in listTasks:
        i.pop("_id")
        i["color"] = classes.find_one({"$and" : [{"userId" : user.uid}, {"className" : i.get("class")}]}).get("classColor")

    for k in user_classes:
        k.pop("_id")
        k.pop("userId")
        tempclasses.append(k)
    listTasks.sort(key=lambda x: x.get('dueDate'))
    resp = jsonify(success=True, tasks=listTasks, classes=tempclasses)
    resp.status_code = 201
    return resp

@task.route('/Class', methods=['GET'])
def getClasses():
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    user_classes = list(classes.find({"userId" : user.uid}))
    tempclasses = []
    for k in user_classes:
        k.pop("_id")
        k.pop("userId")
        tempclasses.append(k)
    resp = jsonify(success=True, classes=tempclasses)
    resp.status_code = 201 #created http code
    return resp

@task.route('/Class', methods=['POST'])
def classPost():
    """Creates a new class in the database"""
    user = User.currentUser()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    args = request.get_json()
    print(args, file=sys.stderr)
    name = args.get('className')
    color = args.get('classColor')
    new_id = classes.find().sort([("classId", -1)]).limit(1)[0]["classId"]
    curClas= Classes(new_id + 1, user.uid, name, color)
    classes.insert_one(curClas.toMongo())
    res_class = classes.find_one({"$and" :
                                        [{"userId" : user.uid},
                                        {"className" : name}]})
    res_class.pop("_id")
    resp = jsonify(success=True, clas=res_class)
    resp.status_code = 201 #created http code
    return resp