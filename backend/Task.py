from flask import jsonify
from dataBase import DataBase
class Task():
    db = DataBase()
    notification = db.getNotifications()

    def __init__(self, taskId, userId, name, desc, clas, dueDate, targetDate, remind, remindDate):
        self.taskId = taskId
        self.userId = userId
        self.name = name
        self.desc = desc
        self.clas = clas
        self.dueDate = dueDate
        self.targetDate = targetDate
        self.remind = remind
        if remind or remindDate is not None:
            self.remindDate = remindDate
            self.scheduleRemind()
        else:
            self.remindDate = None

    def scheduleRemind(self):
        Task.notification.insert_one({"userId" : self.userId, "taskId" : self.taskId, "remindDate" : self.remindDate})

    def toMongo(self):
        return {"taskId" : self.taskId,
                "userId" : self.userId,
                "name" : self.name,
                "desc" : self.desc,
                "class" : self.clas,
                "dueDate" : self.dueDate,
                "targetDate" : self.targetDate,
                "remind" : self.remind,
                "remindDate" : self.remindDate}



        