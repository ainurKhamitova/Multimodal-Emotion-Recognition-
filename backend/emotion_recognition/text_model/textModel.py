import speech_recognition as sr
import moviepy.editor as mp
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
import subprocess
import numpy as np
import os
from moviepy.editor import VideoFileClip
from scipy.io import wavfile
from transformers import RobertaTokenizerFast, TFRobertaForSequenceClassification

current_dir = 'C:/Users/77009/Desktop/mer-project/backend/emotion_recognition/text_model'
tokenizer = RobertaTokenizerFast.from_pretrained('roberta-base')

def tokenize(sentences, max_length=256, padding='max_length'):
    return tokenizer(
        sentences,
        truncation=True,
        padding=padding,
        max_length=max_length,
        return_tensors="tf"
    )

text_model = TFRobertaForSequenceClassification.from_pretrained(
    current_dir + '/roberta',
    num_labels=7
)

def get_length(filename):
    video = VideoFileClip(filename)
    duration = video.duration
    video.close()
    return duration

def split_intervals(original_data):
    new_data = []
    for start, end, predictions in original_data:
        duration = end - start
        for i in range(duration):
            new_start = start + i
            new_end = new_start + 1
            new_data.append((new_start, new_end, predictions))
    return new_data
def process_text(video_path):
    print("Analyzing text...")
    video = video_path
    print(video)
    transcriptions = []
    num_seconds_video = int(get_length(video))
    timestamps = list(range(0, num_seconds_video + 1, 6))  # Change interval to 6 seconds
    if timestamps[-1] != num_seconds_video:
        timestamps.append(num_seconds_video)

    selected_emotions = ['angry', 'disgust', 'fear', 'happy','sad', 'surprise', 'neutral']
    print(timestamps)

    segment_files = []  # List to store the names of segment files
    
    for i in range(len(timestamps) - 1):
        start_time = timestamps[i]
        end_time = min(timestamps[i + 1], start_time + 6)  # Ensure the end time doesn't exceed the next timestamp or 6 seconds
        
        # Extract audio segment
        segment_name = "cut{}.mp4".format(i + 1)
        audio_name = "converted{}.wav".format(i + 1)
        segment_files.extend([segment_name, audio_name])  # Add segment files to the list
        
        ffmpeg_extract_subclip(video, start_time, end_time, targetname=segment_name)

        # Extract audio from video segment
        clip = mp.VideoFileClip(segment_name)
        clip.audio.write_audiofile(audio_name)

        # Transcribe audio
        recognizer = sr.Recognizer()
        with sr.AudioFile(audio_name) as source:
            audio = recognizer.record(source)
            try:
                transcriptions.append((start_time, end_time, recognizer.recognize_google(audio)))
            except sr.UnknownValueError:
                print("Google Speech Recognition could not understand audio")
            except sr.RequestError as e:
                print("Could not request results from Google Speech Recognition service; {0}".format(e))
        os.remove(audio_name)
        clip.close()
        os.remove(segment_name)
    
    res = []

    for (start, end, transcription) in transcriptions:
        tokenized_texts = tokenize(transcription)
        predictions = text_model.predict(tokenized_texts)
        probabilities = (np.exp(predictions.logits) / np.sum(np.exp(predictions.logits), axis=1, keepdims=True))
        res.append((start, end, probabilities.tolist()[0]))
         #predicted_labels = np.argmax(predictions.logits, axis=1)
         #predicted_emotion = np.array(selected_emotions)[predicted_labels.astype(int)]
         #print(f"Text: {transcription}  -  Predicted Emotion: {predicted_emotion}")

    return split_intervals(res)


        

