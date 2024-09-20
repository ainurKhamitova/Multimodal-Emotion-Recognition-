from pymongo import MongoClient
import os



def get_database():
    client = MongoClient(os.getenv('DATABASE_URL'))
    db = client['mer']
    print('Database connected')
    collection_names = db.list_collection_names()
    print('Collections:', collection_names)
    return db
