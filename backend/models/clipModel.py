from bson import ObjectId
from db import get_database

db = get_database()

class Clip:
    def __init__(self, video_id, path, emotion_label, percentage=0):
        self.video_id = video_id
        self.path = path
        self.emotion_label = emotion_label
        self.percentage = percentage

    def save(self):
        # Inserting frame into database
        db.clips.insert_one({
            "video_id": self.video_id,
            "path": self.path,
            "emotion_label": self.emotion_label,
            "percentage": self.percentage

        })

    @staticmethod
    def set_percentage(clip_id, percentage):
        db.clips.update_one({"_id": clip_id}, {"$set": {"percentage": percentage}})

    @staticmethod
    def find_one(query):
        return db.clips.find_one(query)
    
    @staticmethod
    def find(query):
        return db.clips.find(query)
    
    @staticmethod
    def delete(query):
        return db.clips.delete_one(query)
    
