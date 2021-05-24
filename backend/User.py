from dataBase import DataBase


class User():

    instances = []

    def __init__(self, id, name, email, password):
        self.name = name
        self.email = email
        self._password = password
        self.id = id
        self.auth = True
        User.instances.append(self)
    
    @property
    def identity(self):
        return self.id
    
    @property
    def rolenames(self):
        return []
    
    @property
    def password(self):
        return self._password
    
    @password.setter
    def setPassword(self, password):
        self._password = password
    
    @classmethod
    def lookup(cls, username):
        return [inst for inst in cls.instances if inst.email == username][0]

    @classmethod
    def identify(cls, id):
        return [inst for inst in cls.instances if inst.uid == id][0]
    
