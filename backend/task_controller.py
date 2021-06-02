"""Handles everything to do with tasks"""
import sys
from datetime import datetime
from flask import Blueprint, jsonify, request
from user import User
from dataBase import DataBase
from task import Task
from classes import Classes
import pytz

task = Blueprint('task', __name__)
tasks = DataBase.get_tasks()
classes = DataBase.get_classes()
notification = DataBase.get_notifications()
PT = pytz.timezone('US/Pacific')

#Create a task
@task.route('/Today', methods=['POST'])
@task.route('/List', methods=['POST'])
@task.route('/Calendar', methods=['POST'])
def task_post():
    """creates a new task in the database"""
    # if no one logged in
    user = User.current_user()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    #grabs args from post
    args = request.get_json()
    name = args.get('name')
    desc = args.get('desc')
    clas = args.get('class')
    due_date = args.get('dueDate')
    target_date = args.get('targetDate')
    remind = args.get('remind')
    remind_date = args.get('remindDate')
    print(target_date, due_date, remind_date, file=sys.stdout)

    #finds highest task id
    new_id = tasks.find().sort([("taskId", -1)]).limit(1)[0]["taskId"]
    # user = flask_login.current_user
    if remind_date is not None:
        remind_date = datetime.strptime(remind_date, '%Y-%m-%dT%H:%M:%S.%fZ')

    if target_date is not None:
        target_date = datetime.strptime(target_date, '%Y-%m-%dT%H:%M:%S.%fZ')

    if due_date is not None:
        due_date = datetime.strptime(due_date, '%Y-%m-%dT%H:%M:%S.%fZ')

    cur_task = Task(new_id + 1, user.uid, name, desc, clas,
            due_date, target_date, remind, remind_date)
    #inserts new task into mongo
    tasks.insert_one(cur_task.to_mongo())
    res_task = cur_task.to_mongo()
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
def task_delete():
    """Deletes a task in the database"""
    user = User.current_user()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    args = request.get_json()
    task_id = args.get('taskId')
    cur_task = tasks.find_one({"taskId" : task_id})
    if cur_task is None:
        resp = jsonify(success=False)
        resp.status_code = 400 #bad request
        return resp
    tasks.delete_one({"taskId" : task_id})
    resp = jsonify(success=True)
    resp.status_code = 200 #OK
    return resp

# FOR TASK UPDATING NOT IN USE
# @task.route('/Today', methods=['PUT'])
# @task.route('/List', methods=['PUT'])
# @task.route('/Calendar', methods=['PUT'])
# def task_put():
#     """Updates a task in the database"""
#     # if no one logged in
#     user = User.current_user()
#     if user is None:
#         resp = jsonify(success=False)
#         resp.status_code = 401 #Unauthorized
#         return resp
#     args = request.get_json()
#     task_id = args.get('taskId')
#     cur_task = tasks.find_one({"taskId" : task_id})
#     if len(list(cur_task)) == 0:
#         resp = jsonify(success=False)
#         resp.status_code = 400 #bad request
#         return resp

#     name = args.get('name')
#     desc = args.get('desc')
#     clas = args.get('class')
#     due_date = datetime.strptime(args.get('dueDate'), '%Y-%m-%dT%H:%M:%S.%fZ')
#     target_date = datetime.strptime(args.get('targetDate'), '%Y-%m-%dT%H:%M:%S.%fZ')
#     remind = args.get('remind')
#     remind_date = datetime.strptime(args.get('remindDate'), '%Y-%m-%dT%H:%M:%S.%fZ')
#     color = args.get('color')
#     tasks.update_one({"taskId" : task_id},
#                         {"$set": {
#                             "name" : name,
#                             "desc" : desc,
#                             "class" : clas,
#                             "dueDate" : due_date,
#                             "targetDate" : target_date,
#                             "remind" : remind,
#                             "remindDate" : remind_date,
#                             "color" : color
#                         }})
#     resp = jsonify(success=True)
#     resp.status_code = 200 #OK
#     return resp

@task.route('/Today', methods=['GET'])
def today_get():
    """Gets and formats tasks for use on today page"""
    user = User.current_user()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    current = datetime.utcnow()
    start = datetime(current.year, current.month, current.day)
    end = datetime(current.year, current.month, current.day, hour=23, minute=59, second=59)
    today_tasks = tasks.find({"$and":
                                [{"dueDate" : {"$gte" : start , "$lte" : end}},
                                {"userId" : user.uid}]})
    target_tasks = tasks.find({"$and":
                                [{"targetDate" : {"$gte" : start , "$lte" : end}},
                                {"userId" : user.uid}]})
    user_classes = classes.find({"userId" : user.uid})
    today_tasks = list(today_tasks)
    target_tasks = list(target_tasks)
    user_classes = list(user_classes)
    tempclasses = []
    temp_ids = []
    for i in today_tasks:
        i.pop("_id")
        i["isTarget"] = False
        i["dueDate"] = i.get("dueDate")
        i["targetDate"] = i.get("targetDate")
        i["remindDate"] = i.get("remindDate")
        i["color"] = classes.find_one({"$and" :
                                        [{"userId" : user.uid},
                                        {"className" : i.get("class")}]}).get("classColor")
        temp_ids.append(i.get("taskId"))

    for j in target_tasks:
        if j.get("taskId") not in temp_ids:
            j.pop("_id")
            j["isTarget"] = True
            j["dueDate"] = j.get("dueDate")
            j["targetDate"] = j.get("targetDate")
            j["remindDate"] = j.get("remindDate")
            j["color"] = classes.find_one({"$and" :
                                            [{"userId" : user.uid},
                                            {"className" : j.get("class")}]}).get("classColor")
            today_tasks.append(j)

    for k in user_classes:
        k.pop("_id")
        k.pop("userId")
        tempclasses.append(k)

    tempclasses.sort(key=lambda x: x.get("className"))
    today_tasks.sort(key=lambda x: x.get('dueDate'))
    resp = jsonify(success=True, tasks=today_tasks, classes=tempclasses)
    resp.status_code = 201
    return resp

@task.route('/Calendar', methods=['GET'])
def calendar_get():
    """Gets and formats tasks for use on calendar page"""
    user = User.current_user()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    list_tasks = list(tasks.find({"userId" : user.uid}))
    tempclasses = []
    for i in list_tasks:
        i.pop("_id")
        i.pop("desc")
        i.pop("remind")
        i.pop("remindDate")
        i.pop("targetDate")
        i["color"] = classes.find_one({"$and" :
                                        [{"userId" : user.uid},
                                        {"className" : i.get("class")}]}).get("classColor")
        i.pop("taskId")
        i.pop("userId")
        tempclasses.append(i)

    list_tasks.sort(key=lambda x: x.get('dueDate'))
    resp = jsonify(success=True, tasks=list_tasks)
    resp.status_code = 201
    return resp

@task.route('/List', methods=['GET'])
def list_get():
    """Gets and formats tasks for use on list page"""
    user = User.current_user()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    list_tasks = list(tasks.find({"userId" : user.uid}))
    user_classes = list(classes.find({"userId" : user.uid}))
    tempclasses = []
    for i in list_tasks:
        i.pop("_id")
        i["dueDate"] = i.get("dueDate")
        i["targetDate"] = i.get("targetDate")
        i["remindDate"] = i.get("remindDate")
        i["color"] = classes.find_one({"$and" :
                                        [{"userId" : user.uid},
                                        {"className" : i.get("class")}]}).get("classColor")

    for k in user_classes:
        k.pop("_id")
        k.pop("userId")
        tempclasses.append(k)
    list_tasks.sort(key=lambda x: x.get('dueDate'))
    resp = jsonify(success=True, tasks=list_tasks, classes=tempclasses)
    resp.status_code = 201
    return resp

@task.route('/Class', methods=['GET'])
def get_classes():
    """Gets all classes associated with a user"""
    user = User.current_user()
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
def class_post():
    """Creates a new class in the database"""
    user = User.current_user()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    args = request.get_json()
    name = args.get('className')
    color = args.get('classColor')
    new_id = classes.find().sort([("classId", -1)]).limit(1)[0]["classId"]
    cur_clas= Classes(new_id + 1, user.uid, name, color)
    classes.insert_one(cur_clas.to_mongo())
    res_class = classes.find_one({"$and" :
                                        [{"userId" : user.uid},
                                        {"className" : name}]})
    res_class.pop("_id")
    resp = jsonify(success=True, clas=res_class)
    resp.status_code = 201 #created http code
    return resp

@task.route('/Notification', methods=["GET"])
def get_notification():
    """Gets any pending notifications from database"""
    user = User.current_user()
    if user is None:
        resp = jsonify(success=False)
        resp.status_code = 401 #Unauthorized
        return resp
    current = datetime.utcnow()
    notifs = list(notification.find({"$and" :
                                        [{"userId" : user.uid},
                                        {"remindDate" : {"$lte" : current}}]}))
    if len(notifs) == 0:
        resp = jsonify(success=True)
        resp.status_code = 204
        return resp
    notif_tasks = []
    for i in notifs:
        tempt = tasks.find_one({"taskId" : i.get("taskId")})
        if tempt is not None:
            notif_tasks.append(tempt.get("name"))
            notification.delete_one({"taskId" : i.get("taskId")})
    # If all tasks that had notifications were deleted
    if len(notif_tasks) == 0:
        resp = jsonify(success=True)
        resp.status_code = 204
        return resp
    resp = jsonify(success=True, notification=notif_tasks)
    resp.status_code = 200 #OK
    return resp
