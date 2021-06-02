"""represents user in database"""
from flask_login import UserMixin

class User(UserMixin):
    """represents user in database"""
    # Jank way of keeping track of current user
    instances = []

    def __init__(self, name, email, password, uid):
        self.name = name
        self.email = email
        self.password = password
        self.uid = uid
        self._login = False
        User.instances.append(self)

    @property
    def is_authenticated(self):
        """flask_login auth check"""
        return True

    @property
    def is_active(self):
        """flask_login auth check"""
        return True

    @property
    def is_anonymous(self):
        """flask_login auth check"""
        return False

    def get_id(self):
        """flask_login auth check"""
        return str(self.uid).encode("utf-8").decode("utf-8")

    def is_logged_in(self):
        """checks if user is logged in"""
        return self._login

    def login(self):
        """login user"""
        self._login = True

    def logout(self):
        """log out user"""
        self._login = False

    @classmethod
    def current_user(cls):
        """gets current loggedin user"""
        user = [inst for inst in cls.instances if inst.is_logged_in() is True]
        if len(user) == 1:
            return user[0]
        return None
