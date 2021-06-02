# pylint: disable=redefined-outer-name
# pylint: disable=singleton-comparison
"""test user implementation"""
from user import User

def test_user1():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.name == "peter"

def test_user2():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.email == "1@email.com"

def test_user3():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.password == "1234"

def test_user4():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.uid == 1

def test_user5():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.is_authenticated == True

def test_user6():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.is_active == True

def test_user7():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.is_anonymous == False

def test_user8():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.get_id() == "1"

def test_user9():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    assert user.is_logged_in() == False

def test_user10():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    user.login()
    assert user.is_logged_in() == True
    user.logout()

def test_user11():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    user.login()
    user.logout()
    assert user.is_logged_in() == False

def test_user12():
    """test user init"""
    user = User("peter", "1@email.com", "1234", 1)
    user.login()
    assert User.current_user().name == "peter"
    user.logout()

def test_user13():
    """test user init"""
    assert User.current_user() == None
