from db import get_database

db = get_database()

class User:
    def __init__(self, email, name, surname, password):
        self.email = email
        self.name = name
        self.surname = surname
        self.password = password

    @staticmethod
    def save(user):
        db.users.insert_one({
            "email": user['email'],
            "name": user['name'],
            "surname": user['surname'],
            "password": user['password']
        })

    @staticmethod
    def find_one(query):
        return db.users.find_one(query)
    
   
    
    
    


   