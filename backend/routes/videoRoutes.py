
from flask import Blueprint, jsonify, request
from models.clipModel import Clip
from utils.videoUtils import allowed_file, analyze_video
from models.videoModel import Video
from werkzeug.utils import secure_filename
import os
from models.userModel import User


videos_bp = Blueprint('videos', __name__)   

@videos_bp.route("/api/videos/upload", methods=["POST"])
def upload_video():
    video = request.files['video']

    if video.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Check if file extension is allowed
    if not allowed_file(video.filename):
        return jsonify({'error': 'Invalid file type'}), 400
    
    email= request.form.get('email')
    user = User.find_one({'email': email})

    if user:
      
      
        current_directory = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

        directory_path = os.path.join(current_directory, 'frontend', 'public', 'results', 'videos', str(user['email']), '')

        file_path = os.path.join(directory_path, secure_filename(video.filename))



        new_video ={
            "title": secure_filename(video.filename),
            "path": 'results/videos/' +  str(user['email']) + '/' + secure_filename(video.filename),
            "user_id": user['_id']
        }


        if not os.path.exists(directory_path):
            os.makedirs(directory_path)

        if os.path.exists(file_path):
            print('The video already exists for this user.')
            return jsonify({'msg': 'The video already exists for this user.'}), 400
        else:
            print('Saving video...')
            video.save(file_path)
            Video.save(new_video)
            result, statistics = analyze_video(new_video)
           

           # Convert `ObjectId` to string
            new_video['user_id'] = str(new_video['user_id'])

            return jsonify({'result': result, 'statistics': statistics, 'video': new_video}), 201
    else:
        return jsonify({'msg': 'User not found'}), 404
    


@videos_bp.route("/api/videoResults", methods=["GET"])
def get_video_results():
    email = request.args.get('email')
    user = User.find_one({'email': email})
    res = []
    if user:
        video_title = request.args.get('video_title')
        videos = Video.find({'user_id': user['_id']})
        videos = list(videos)
        for video in videos:
            video['user_id'] = str(video['user_id'])
            clips = Clip.find({'video_id': video['_id']})
            clips = list(clips)
            emotionResults = {}
            for clip in clips:
                if clip['emotion_label'] not in emotionResults:
                    emotionResults[clip['emotion_label']] = clip['percentage']
            res.append({'video_title': video['title'], 'emotions': emotionResults})
        return jsonify(res), 200
    else:
        return jsonify({'msg': 'User not found'}), 404
                
                
            
@videos_bp.route("/api/videoResultHistory", methods=["GET"])
def get_video_result_history():
    email = request.args['email']
    user = User.find_one({'email': email})
    res = []
    if user:
        video_title = request.args['video_title']
        print(video_title)
        video = Video.find_one({'user_id': user['_id'], 'title': video_title})
        
        if video:
            video['user_id'] = str(video['user_id'])  # Convert ObjectId to string
            clips = Clip.find({'video_id': video['_id']})
            
            result = {}
            statistics = {}
            clips = list(clips)

            for clip in clips:
                result[clip['emotion_label']] = clip['path']
                statistics[clip['emotion_label']] = clip['percentage']

            new_video ={
                "title": str(video['title']),
                "path": str(video['path']),
                "user_id": video['user_id']
            }
            return jsonify({'result': result, 'statistics': statistics, 'video': new_video}), 201
        else:
            return jsonify({'msg': 'Video not found'}), 404
    
    else:
        return jsonify({'msg': 'User not found'}), 404
    
@videos_bp.route("/api/deleteVideo", methods=["DELETE"])
def delete_video():
    email = request.args['email']
    user = User.find_one({'email': email})
    if user:
        video_title = request.args['video_title']
        video = Video.find_one({'user_id': user['_id'], 'title': video_title})
        if video:
            clips = Clip.find({'video_id': video['_id']})
            clips = list(clips)
            for clip in clips:
                Clip.delete({'_id': clip['_id']})
                root_directory = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
                file_path = os.path.join(root_directory, 'frontend', 'public', clip['path'])
                if os.path.exists(file_path):
                    os.remove(file_path)
            root_directory = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            file_path = os.path.join(root_directory, 'frontend', 'public', video['path'])
            if os.path.exists(file_path):
                os.remove(file_path)
            Video.delete({'_id': video['_id']})

            # find the remaining videos
            videos = Video.find({'user_id': user['_id']})
            res = []
            if videos:
                videos = list(videos)
            for video in videos:
                video['user_id'] = str(video['user_id'])
                clips = Clip.find({'video_id': video['_id']})
                clips = list(clips)
                emotionResults = {}
                for clip in clips:
                    if clip['emotion_label'] not in emotionResults:
                        emotionResults[clip['emotion_label']] = clip['percentage']
                res.append({'video_title': video['title'], 'emotions': emotionResults})

            return jsonify(res), 200

        else:
            return jsonify({'msg': 'Video not found'}), 404
    else:
        return jsonify({'msg': 'User not found'}), 404