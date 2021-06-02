"""test auth"""
# pylint: disable=redefined-outer-name
# pylint: disable=duplicate-code
from app import create_app
from database import DataBase
import pytest

@pytest.fixture
def client():
    """creates a flask app"""
    return create_app()

def test_login(client):
    """correct login"""
    res = client.test_client().post('/login', json={"email" : "test@email.com",
                                    "password" : "1234"})
    assert res.status_code == 202
    client.test_client().post('logout')

def test_login2(client):
    """user does not exist"""
    res = client.test_client().post('/login', json={"email" : "not a user",
                                    "password" : "1234"})
    assert res.status_code == 403


def test_login3(client):
    """wrong password"""
    res = client.test_client().post('/login', json={"email" : "test@email.com",
                                    "password" : "not a password"})
    assert res.status_code == 403

def test_signup(client):
    """good signup"""
    res = client.test_client().post('/signup', json={"email" : "test_user@email.com",
                                    "password" : "1", "name" : "test_user"})
    assert res.status_code == 201
    DataBase.get_users().delete_one({"name" : "test_user"})

def test_signup2(client):
    """user already exists"""
    res = client.test_client().post('/signup', json={"email" : "test@email.com",
                                    "password" : "1", "name" : "test_user"})
    assert res.status_code == 409

def test_logout(client):
    """good logout"""
    client.test_client().post('/login', json={"email" : "test@email.com",
                                "password" : "1234"})
    res = client.test_client().post('logout')
    assert res.status_code == 200

def test_logout2(client):
    """no one logged in"""
    res = client.test_client().post('logout')
    assert res.status_code == 304
