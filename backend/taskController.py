from datetime import datetime, date
from flask import Blueprint, jsonify, request
import flask_login
from dataBase import DataBase
from Task import Task
import sys


task = Blueprint('task', __name__)
db = DataBase()
tasks = db.getTasks()

@task.route('/Today', methods=['POST'])
def taskPost():
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

    task = Task(new_id + 1, 1, name, desc, clas, 
            datetime.strptime(dueDate, '%m-%d-%Y %I:%M %p'), 
            datetime.strptime(targetDate, '%m-%d-%Y %I:%M %p'), 
            remind, datetime.strptime(remindDate, '%m-%d-%Y %I:%M %p'))
    #inserts new task into mongo
    tasks.insert_one(task.toMongo())
    #sets return
    resp = jsonify(success=True)
    resp.status_code = 201 #created http code
    return resp

@task.route('/Today', methods=['DELETE'])
def taskDelete():
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
    

@task.route('/Today', methods=['PUT'])
def taskPut():
    args = request.get_json()
    taskId = args.get('taskId')
    task = tasks.find_one({"taskId" : taskId})
    if len(list(task)) == 0:
        resp = jsonify(success=False)
        resp.status_code = 400 #bad request
        return resp
    
@task.route('/Today', methods=['GET'])
def todayGet():
    current = datetime.now()
    start = datetime(current.year, current.month, current.day)
    end = datetime(current.year, current.month, current.day, hour=23, minute=59, second=59)
    today_tasks = tasks.find({"dueDate" : {"$gte" : start , "$lte" : end}})
    target_tasks = tasks.find({"targetDate" : {"$gte" : start , "$lte" : end}})
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
