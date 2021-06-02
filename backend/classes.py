"""creates a class model for insertion to database"""
class Classes():
    """represents a class in the database"""
    def __init__(self, class_id, user_id, name, color):
        self.class_id = class_id
        self.user_id = user_id
        self.name = name
        self.color = color

    def get_class_id(self):
        """getter for class_id"""
        return self.class_id

    def to_mongo(self):
        """Creates a json representation of class for mongo insert"""
        return {"classId" : self.class_id,
                "userId" : self.user_id,
                "className" : self.name,
                "classColor" : self.color}
