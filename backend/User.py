from flask_login import UserMixin

class User(UserMixin):

    instances = []

    def __init__(self, name, email, password, uid):
        self.name = name
        self.email = email
        self.password = password
        self.uid = uid
        self._login = False
        User.instances.append(self)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.uid).encode("utf-8").decode("utf-8")

    def isLoggedIn(self):
        return self._login
    
    def login(self):
        self._login = True
    
    def logout(self):
        self._login = False

    @classmethod
    def currentUser(cls):
        user = [inst for inst in cls.instances if inst.isLoggedIn() is True]
        if len(user) == 1:
            return user[0]
        else:
            return None

    
