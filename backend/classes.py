    
class Classes():
    
    def __init__(self, classId, userId, name, color):
        self.classId = classId
        self.userId = userId
        self.name = name
        self.color = color

    def scheduleRemind(self):
        pass

    def toMongo(self):
        return {"classId" : self.classId,
                "userId" : self.userId,
                "className" : self.name,
                "classColor" : self.color}