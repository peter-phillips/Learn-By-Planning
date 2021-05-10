from flask_login import UserMixin
import itertools

class User(UserMixin):

    def __init__(self, name, email, password, uid):
        self.name = name
        self.email = email
        self.password = password
        self.uid = uid

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.uid
    
