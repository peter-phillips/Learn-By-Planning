import pytest
from User import User

def test_1():
    assert User("peter", "1@email.com", "1234", 1).name == "peter"

