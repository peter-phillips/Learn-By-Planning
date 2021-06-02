# pylint: disable=redefined-outer-name
"""tests task"""
from task import Task

def test_task1():
    """tests task init"""
    task = Task(1, 1, "test_task", "a test task", "test_class",
    "test_due", "test_target", False, None)
    assert task.to_mongo() == {"taskId" : 1,
                "userId" : 1,
                "name" : "test_task",
                "desc" : "a test task",
                "class" : "test_class",
                "dueDate" :"test_due",
                "targetDate" : "test_target",
                "remind" : False,
                "remindDate" : None}

def test_task2():
    """tests task init"""
    task = Task(1, 1, "test_task", "a test task", "test_class",
    "test_due", "test_target", True, "test_remind")
    assert task.to_mongo() == {"taskId" : 1,
                "userId" : 1,
                "name" : "test_task",
                "desc" : "a test task",
                "class" : "test_class",
                "dueDate" :"test_due",
                "targetDate" : "test_target",
                "remind" : True,
                "remindDate" : "test_remind"}

    # Makes sure notification was scheduled and deletes it
    assert Task.notification.find_one({"$and" :
                                        [{"userId" : 1},
                                        {"taskId" : 1}]}).get("remindDate") == "test_remind"
    Task.notification.delete_one({"$and" :
                                        [{"userId" : 1},
                                        {"taskId" : 1}]})
