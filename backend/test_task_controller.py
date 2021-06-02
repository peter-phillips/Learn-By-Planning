# pylint: disable=redefined-outer-name
# pylint: disable=duplicate-code
"""tests flask implementation of task_controller"""
from datetime import datetime
from app import create_app, load_user
from database import DataBase
import pytest

@pytest.fixture
def client():
    """Creates flask app"""
    return create_app()

#bad placement but for coverage need to run
def test_load_user():
    """tests flask_login load_user NOTE never used but needed for implmentaion"""
    user = load_user("1")
    assert user.name == "default"


def test_task_post(client):
    """correct login task post"""
    client.test_client().post('/login', json={"email" : "test@email.com",
                                    "password" : "1234"})
    res = client.test_client().post('/Today', json={"name" : "pytest testing 6754324324",
                                            "desc" : "testing",
                                            "dueDate" : "2021-06-01T06:00:00.000Z",
                                            "targetDate" : "2021-06-01T06:00:00.000Z",
                                            "remind" : "False",
                                            "remindDate" : None,
                                            "class" : "cpe-123"})
    assert res.status_code == 201
    client.test_client().post('logout')

def test_task_post2(client):
    """no login task_post"""
    res = client.test_client().post('/Today', json={"name" : "pytest testing 6754324324",
                                            "desc" : "testing",
                                            "dueDate" : "2021-06-01T06:00:00.000Z",
                                            "targetDate" : "2021-06-01T06:00:00.000Z",
                                            "remind" : "False",
                                            "remindDate" : None,
                                            "class" : "cpe-123"
                                            })
    assert res.status_code == 401

def test_task_delete(client):
    """correct login task delete task created in previous test"""
    client.test_client().post('/login', json={"email" : "test@email.com",
                                    "password" : "1234"})
    task_id = DataBase.get_tasks().find_one({"name" : "pytest testing 6754324324"}).get("taskId")
    res = client.test_client().delete('/Today', json={"taskId" : task_id})
    assert res.status_code == 200
    client.test_client().post('logout')

def test_task_delete2(client):
    """delete with no login"""
    res = client.test_client().delete('/Today', json={"taskId" : -1})
    assert res.status_code == 401

def test_task_delete3(client):
    """bad delete request"""
    client.test_client().post('/login', json={"email" : "test@email.com",
                                    "password" : "1234"})
    res = client.test_client().delete('/Today', json={"taskId" : -1})
    assert res.status_code == 400
    client.test_client().post('logout')

def test_today_get(client):
    """Normal today get- NOTE: Time dependent"""
    now = datetime.now()
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                                    "password" : "1234"})
    client.test_client().post('/Today', json={"name" : "pytest testing 6754324324",
                                            "desc" : "testing",
                                            "dueDate" : now.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                                            "targetDate" : "2021-06-01T06:00:00.000Z",
                                            "remind" : "False",
                                            "remindDate" : "2021-06-01T06:00:00.000Z",
                                            "class" : "pytestClass"})

    client.test_client().post('/Today', json={"name" : "pytest testing 12321312",
                                            "desc" : "testing",
                                            "dueDate" : "2021-06-30T06:00:00.000Z",
                                            "targetDate" : now.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                                            "remind" : "False",
                                            "remindDate" : None,
                                            "class" : "pytestClass"})

    client.test_client().post('/Today', json={"name" : "pytest testing 42342342",
                                            "desc" : "testing",
                                            "dueDate" :
                                            datetime(2000, 1, 1).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                                            "targetDate" : "2000-06-01T06:00:00.000Z",
                                            "remind" : "False",
                                            "remindDate" : None,
                                            "class" : "pytestClass"})
    res = client.test_client().get('/Today')
    assert b'pytest testing 6754324324' in res.data
    assert b'pytest testing 12321312' in res.data
    assert b'pytest testing 42342342' not in res.data
    assert res.status_code == 201
    client.test_client().post('logout')
    #Clean up created notification
    DataBase.get_notifications().delete_one({"userId" : 4})

def test_today_get2(client):
    """not loged in"""
    res = client.test_client().get('/Today')
    assert res.status_code == 401

def test_calendar_get(client):
    """tests calendar get using tasks above"""
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                                "password" : "1234"})
    res = client.test_client().get('/Calendar')
    assert b'pytest testing 6754324324' in res.data
    assert b'pytest testing 12321312' in res.data
    assert b'pytest testing 42342342' in res.data
    assert res.status_code == 201
    client.test_client().post('logout')

def test_calendar_get2(client):
    """tests calendar get without auth"""
    res = client.test_client().get('/Calendar')
    assert res.status_code == 401

def test_list_get(client):
    """tests list get using tasks above"""
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                                "password" : "1234"})
    res = client.test_client().get('/List')
    assert b'pytest testing 6754324324' in res.data
    assert b'pytest testing 12321312' in res.data
    assert b'pytest testing 42342342' in res.data
    assert res.status_code == 201
    client.test_client().post('logout')
    #Clean up added tasks
    DataBase.get_tasks().delete_one({"name" : "pytest testing 6754324324"})
    DataBase.get_tasks().delete_one({"name" : "pytest testing 12321312"})
    DataBase.get_tasks().delete_one({"name" : "pytest testing 42342342"})

def test_list_get2(client):
    """tests list get without auth"""
    res = client.test_client().get('/List')
    assert res.status_code == 401


def test_class_post(client):
    """test class post with auth"""
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                            "password" : "1234"})
    res = client.test_client().post('/Class', json={"className" : "pytstClass2",
                                    "classColor" : "test"})
    assert res.status_code == 201
    client.test_client().post('logout')

def test_class_post2(client):
    """"test class post without auth"""
    res = client.test_client().post('/Class', json={"className" : "pytstClass2",
                                    "classColor" : "test"})
    assert res.status_code == 401

def test_class_get(client):
    """tests class get using class above and predefined for pytest user"""
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                                "password" : "1234"})
    res = client.test_client().get('/Class')
    assert b'"pytstClass2"' in res.data
    assert b'pytestClass' in res.data
    assert res.status_code == 201
    client.test_client().post('logout')
    #Clean up
    DataBase.get_classes().delete_one({"name" : "pytstClass2"})

def test_class_get2(client):
    """tests get class without auth"""
    res = client.test_client().get('/Class')
    assert res.status_code == 401

def test_notif_get(client):
    """no notif to get"""
    DataBase.get_notifications().delete_many({"userId" : 4})
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                                "password" : "1234"})
    res = client.test_client().get('/Notification')
    assert res.status_code == 204
    client.test_client().post('logout')

def test_notif_get2(client):
    """test get notification"""
    now = datetime.now()
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                                "password" : "1234"})
    client.test_client().post('/Today', json={"name" : "pytest testing 6754324324",
                                            "desc" : "testing",
                                            "dueDate" : now.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                                            "targetDate" : "2021-06-01T06:00:00.000Z",
                                            "remind" : "False",
                                            "remindDate" : now.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                                            "class" : "pytestClass"})
    res = client.test_client().get('/Notification')

    assert b'pytest testing 6754324324'
    assert res.status_code == 200
    client.test_client().post('logout')
    DataBase.get_tasks().delete_one({"name" : "pytest testing 6754324324"})

def test_notif_get3(client):
    """test notification get without auth"""
    res = client.test_client().get('/Notification')
    assert res.status_code == 401

def test_notif_get4(client):
    """test notification get if notification scheduled but task was deleted"""
    now = datetime.now()
    client.test_client().post('/login', json={"email" : "pytestuser@email.com",
                                "password" : "1234"})
    client.test_client().post('/Today', json={"name" : "pytest testing 6754324324",
                                            "desc" : "testing",
                                            "dueDate" : now.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                                            "targetDate" : "2021-06-01T06:00:00.000Z",
                                            "remind" : "False",
                                            "remindDate" : now.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
                                            "class" : "pytestClass"})
    DataBase.get_tasks().delete_one({"name" : "pytest testing 6754324324"})
    res = client.test_client().get('/Notification')
    assert res.status_code == 204
    client.test_client().post('logout')
