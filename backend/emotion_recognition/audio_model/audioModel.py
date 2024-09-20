

import librosa
import librosa.display
import numpy as np
import os
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from scipy.io import wavfile
from moviepy.editor import VideoFileClip
from keras.models import load_model


current_dir = 'C:/Users/77009/Desktop/mer-project/backend/emotion_recognition/audio_model'
emotions= ['neutral', 'happy', 'sad', 'angry', 'fear', 'disgust', 'surprise']

audio_model = load_model(current_dir + '/speechModel.keras')

def extract_features(data, sample_rate):
    # ZCR
    result = np.array([])
    zcr = np.mean(librosa.feature.zero_crossing_rate(y=data).T, axis=0)
    result=np.hstack((result, zcr)) # stacking horizontally

    # Chroma_stft
    stft = np.abs(librosa.stft(data))
    chroma_stft = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis=0)
    result = np.hstack((result, chroma_stft)) # stacking horizontally

    # MFCC
    mfcc = np.mean(librosa.feature.mfcc(y=data, sr=sample_rate).T, axis=0)
    result = np.hstack((result, mfcc)) # stacking horizontally

    # Root Mean Square Value
    rms = np.mean(librosa.feature.rms(y=data).T, axis=0)
    result = np.hstack((result, rms)) # stacking horizontally

    # MelSpectogram
    mel = np.mean(librosa.feature.melspectrogram(y=data, sr=sample_rate).T, axis=0)
    result = np.hstack((result, mel)) # stacking horizontally

    return result

def get_features(path):
    # duration and offset are used to take care of the no audio in start and the ending of each audio files as seen above.
    data, sample_rate = librosa.load(path, offset=0.6)

    # without augmentation
    res1 = extract_features(data, sample_rate)
    result = np.array(res1)

    return result

def get_predict_feat(path):

  X = get_features(path)

  scaler = StandardScaler()

  X = np.expand_dims(X, axis=1)
  X = np.expand_dims(X, axis=0)

  return X




def split_audio(path):

  pathes = []

  sample_rate, data = wavfile.read(path)

  part_length_seconds = 1.0

  part_length_samples = int(part_length_seconds * sample_rate)

  num_parts = len(data) // part_length_samples

  audio_parts = np.array_split(data[:num_parts * part_length_samples], num_parts)

  for i, part in enumerate(audio_parts):
      wavfile.write(f'part_{i+1}.wav', sample_rate, part)
      pathes.append(f'part_{i+1}.wav')

  return pathes

def extract_audio(video_path):
    try:
        # Load the video clip
        video_clip = VideoFileClip(video_path)

        # Extract the audio
        audio_clip = video_clip.audio

        # Generate a path for saving the audio file
        audio_path = current_dir + '/audio.wav'

        # Write the audio file
        audio_clip.write_audiofile(audio_path)

        # Close the video clip
        video_clip.close()

        return audio_path
    except Exception as e:
        print(f"Error extracting audio: {e}")
        return None

def process_audio(video_path):
    print("Analyzing audio...")
    audio_path = extract_audio(video_path)

    if audio_path is None:
        return None

    pathes = split_audio(audio_path)

    predictions = []
    for i, path in enumerate(pathes):
        data = get_predict_feat(path)
        prediction = audio_model.predict(data).tolist()[0]
        labels = ['Neutral', 'Happy', 'Sad', 'Angry', 'Fear', 'Disgust', 'Surprise']


        # new_labels_order =  ['angry', 'disgust', 'fear', 'happy','sad', 'surprise', 'neutral']

        index_to_newlabel_mapping = {
            3: 0,
            5: 1,
            4: 2,
            1: 3,
            2: 4,
            6: 5,
            0: 6,
        }
        new_predictions = [None] * len(labels)# Initialize with None values
        for index in range(0, len(prediction)):
          new_index = index_to_newlabel_mapping[index]
          new_predictions[new_index] = prediction[index]
        predictions.append((i * 1.0, (i + 1) * 1.0, new_predictions))
        # predicted_labels = np.argmax(new_predictions)
        # predicted_emotion = np.array(new_labels_order)[predicted_labels.astype(int)]
        # print(f"Audio: {i * 1.0} to {(i + 1) * 1.0} -  Predicted Emotion: {predicted_emotion}")
        os.remove(path)

    os.remove(audio_path)
    return predictions


