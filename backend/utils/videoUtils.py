
import os
import cv2
from bson import ObjectId
from models.videoModel import Video
from models.userModel import User
from models.clipModel import Clip   
from moviepy.editor import VideoFileClip, concatenate_videoclips
from werkzeug.utils import secure_filename
import json
from emotion_recognition.lateFusion import mer_model
from decimal import Decimal


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'wmv'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def analyze_video(video ):
    
    print("Analyzing video:", video['title'])
    root_directory = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    directory_path = os.path.join(root_directory, 'frontend', 'public', video['path'])
    
    timeframes_with_emotions = mer_model(directory_path)

    print("Timeframes with emotions:", timeframes_with_emotions)

    # timeframes_with_emotions = [
    #     (0, 5, "happy"),
    #     (5, 10, "sad"),
    #     (10, 15, "angry"),
    #     (15, 20, "sad"),
    #     (20, 25, "angry"),
    #     (25, 30, "happy"),
    # ]



    merged_result = merge_video_clips(video, timeframes_with_emotions)

    statistics = get_emotion_percentage(video['path'], timeframes_with_emotions)

    print("Merged Result:", merged_result)
    print("Statistics:", statistics)
    
    return merged_result, statistics


def merge_video_clips(video, timeframes_with_emotions):
    root_directory = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    directory_path = os.path.join(root_directory, 'frontend', 'public', video['path'])

    emotion_clips = {} 

    for start, end, emotion in timeframes_with_emotions:
        start_time = start
        end_time = end
        video_clip = VideoFileClip(directory_path).subclip(start_time, end_time)
        if emotion not in emotion_clips:
            emotion_clips[emotion] = []
        emotion_clips[emotion].append(video_clip)

    # Merge video clips for each emotion
    merged_files = {}
    for emotion, clips in emotion_clips.items():
        print("Creating clip for emotion:", emotion)
        email = User.find_one({'_id': ObjectId(video['user_id'])})['email']
        output_directory = os.path.join(root_directory, 'frontend', 'public', 'results', 'clips', str(email), str(video['title']))
        os.makedirs(output_directory, exist_ok=True)
        output_filename = secure_filename(emotion + '_clip.mp4')
        output_path = os.path.join(output_directory, output_filename)

        # Concatenate video clips
        final_clip = concatenate_videoclips(clips)
        final_clip.write_videofile(output_path)

        merged_files[emotion] = 'results/clips/' + str(email) + '/' + str(video['title']) + '/' + output_filename

        # Save clip information to database (Assuming User and Video models are defined elsewhere)
        new_clip = Clip(video_id=Video.find_one({'path': video['path']})['_id'], path='results/clips/' + str(email) + '/' + str(video['title']) + '/' + output_filename, emotion_label=emotion, percentage=0)
        new_clip.save()

    return merged_files

def get_emotion_percentage(video_path, timeframes_with_emotions):
    # Open the video file
    root_directory = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    directory_path = os.path.join(root_directory, 'frontend', 'public', video_path)
    video_capture = cv2.VideoCapture(directory_path)
  

    emotion_counts = {"happy": 0, "sad": 0, "angry": 0, "fear": 0, "surprise": 0, "neutral": 0, "disgust": 0}  # Add more emotions as needed
    
 

    total_time = 0;

    # Iterate through each timeframe
    for start, end, emotion in timeframes_with_emotions:
        
        duration = end - start
        emotion_counts[emotion] += duration
        total_time += duration

        

    # Calculate emotion percentages
    emotion_percentages = {}
    for emotion, count in emotion_counts.items():
        percentage = (count / total_time) * 100
        if(percentage > 0):
            emotion_percentages[emotion] = round(percentage, 1)

            video = Video.find_one({'path': video_path})
            emotion_clip_from_db = Clip.find_one({'video_id': ObjectId(video['_id']), 'emotion_label': emotion})



         
            Clip.set_percentage(emotion_clip_from_db['_id'], percentage)
       
  
    # Release video capture object
    video_capture.release()

    return emotion_percentages

    