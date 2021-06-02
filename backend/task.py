"""represents a task in the database"""
from database import DataBase
# pylint: disable=too-many-instance-attributes
# pylint: disable=too-many-arguments
class Task():
    """represents a task in the database"""
    notification = DataBase.get_notifications()

    def __init__(self, task_id, user_id, name, desc, clas, due_date, tg_date, remind, remind_date):
        self.task_id = task_id
        self.user_id = user_id
        self.name = name
        self.desc = desc
        self.clas = clas
        self.due_date = due_date
        self.target_date = tg_date
        self.remind = remind
        if remind or remind_date is not None:
            self.remind_date = remind_date
            self.schedule_remind()
        else:
            self.remind_date = None

    def schedule_remind(self):
        """scedules a notification in the database"""
        Task.notification.insert_one({"userId" : self.user_id,
                                        "taskId" : self.task_id,
                                        "remindDate" : self.remind_date})

    def to_mongo(self):
        """converts class to JSON for mongo"""
        return {"taskId" : self.task_id,
                "userId" : self.user_id,
                "name" : self.name,
                "desc" : self.desc,
                "class" : self.clas,
                "dueDate" : self.due_date,
                "targetDate" : self.target_date,
                "remind" : self.remind,
                "remindDate" : self.remind_date}
