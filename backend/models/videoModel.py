from db import get_database

db = get_database()

class Video:
    def __init__(self, title, path, user_id):
        self.title = title
        self.path = path
        self.user_id = user_id

    @staticmethod
    def save(video):
        db.videos.insert_one({
            "title": video['title'],
            "path": video['path'],
            "user_id": video['user_id'],
        })

    @staticmethod
    def find_one(query):
        return db.videos.find_one(query)
    

    @staticmethod
    def find(query):
        return db.videos.find(query)
    
    @staticmethod
    def delete(query):
        return db.videos.delete_one(query)

   