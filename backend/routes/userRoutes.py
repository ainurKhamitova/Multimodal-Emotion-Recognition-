
from flask import Blueprint, jsonify, request
from models.userModel import User
from models.videoModel import Video
from flask_jwt_extended import create_access_token
import hashlib

users_bp = Blueprint('users', __name__)

@users_bp.route("/api/register", methods=["POST"])
def register():
    new_user = request.get_json()  # store the json body request
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest()  # encrypt password
    print(new_user)
    doc = User.find_one({'email': new_user['email']})  # check if email exists
    if not doc:
        User.save(new_user)
        user_from_db = User.find_one({'email': new_user['email']}) 
        access_token = create_access_token(identity=user_from_db['email'])
        # Include additional user details in the response
        user_details = {    
            'access_token': access_token,
            'email': user_from_db['email'],
            'name': user_from_db.get('name', ''),
            'surname': user_from_db.get('surname', ''),
            'video_count': '0'
        }
        return jsonify(user_details), 200
    else:
        return jsonify({'msg': 'Email already exists'}), 409


@users_bp.route("/api/login", methods=["POST"])
def login():
    login_details = request.get_json() 
    user_from_db = User.find_one({'email': login_details['email']}) 

    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['email']) 
            videos = Video.find({'user_id': user_from_db['_id']})
            if videos:
                video_count = len(list(videos))
            else:
                video_count = 0
            user_details = {
                'access_token': access_token,
                'email': user_from_db['email'],
                'name': user_from_db.get('name', ''),
                'surname': user_from_db.get('surname', ''),
                'video_count': str(video_count)
            }
        
            return jsonify(user_details), 200

    return jsonify({'msg': 'The email or password is incorrect'}), 401


@users_bp.route("/api/user", methods=["GET"])
def get_user():
    email = request.args.get('email')
    user = User.find_one({'email': email})
    if user:
        videos = Video.find({'user_id': user['_id']})
        if videos:
            video_count = len(list(videos))
        else:
            video_count = 0

        user_details = {
            'email': user.get('email', ''),
            'name': user.get('name', ''),
            'surname': user.get('surname', ''),
            'video_count': str(video_count)
        }
        
        return jsonify(user_details), 200
    else:
        return jsonify({'msg': 'User not found'}), 404
