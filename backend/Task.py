from flask import jsonify
class Task():

    def __init__(self, taskId, userId, name, desc, clas, dueDate, targetDate, remind, remindDate=None):
        self.taskId = taskId
        self.userId = userId
        self.name = name
        self.desc = desc
        self.clas = clas
        self.dueDate = dueDate
        self.targetDate = targetDate
        self.remind = remind
        if remind:
            self.remindDate = remindDate
        else:
            self.remindDate = remindDate

    def scheduleRemind(self):
        pass

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



        