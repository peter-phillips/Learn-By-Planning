# pylint: disable=redefined-outer-name
"""tests classes"""
from classes import Classes

def test_class1():
    """test class init"""
    clas = Classes(1, 1, "test_class", "blue")
    assert clas.class_id == 1

def test_class2():
    """test class init"""
    clas = Classes(2, 1, "test_class", "blue")
    assert clas.user_id == 1

def test_class3():
    """test class init"""
    clas = Classes(1, 1, "test_class", "blue")
    assert clas.name == "test_class"

def test_class4():
    """test class init"""
    clas = Classes(1, 2, "test_class", "blue")
    assert clas.get_class_id() == 1

def test_class5():
    """test class init"""
    clas = Classes(1, 2, "test_class", "blue")
    assert clas.to_mongo() == {"classId" : 1,
                "userId" : 2,
                "className" : "test_class",
                "classColor" : "blue"}
