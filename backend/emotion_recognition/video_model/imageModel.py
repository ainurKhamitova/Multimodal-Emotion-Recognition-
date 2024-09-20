from flask import  jsonify
import cv2
import numpy as np
import dlib
from scipy.ndimage import zoom
from imutils import face_utils
from keras.models import model_from_json
from keras.models import load_model


current_dir = 'C:/Users/77009/Desktop/mer-project/backend/emotion_recognition/video_model'

# Load face detector and shape predictor
face_detect = dlib.get_frontal_face_detector()
predictor_landmarks = dlib.shape_predictor(current_dir + "/shape_predictor_68_face_landmarks.dat")

# Define constants for facial landmarks
shape_x = 48
shape_y = 48

# Constants for eye aspect ratio calculation
thresh = 0.25

# Define facial landmark indices
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
(nStart, nEnd) = face_utils.FACIAL_LANDMARKS_IDXS["nose"]
(mStart, mEnd) = face_utils.FACIAL_LANDMARKS_IDXS["mouth"]
(jStart, jEnd) = face_utils.FACIAL_LANDMARKS_IDXS["jaw"]
(eblStart, eblEnd) = (17, 22)
(ebrStart, ebrEnd) = (22, 27)

# Load model
# model = model_from_json(open(current_dir + "/fer.json", "r").read())
image_model = load_model(current_dir + '/fer1.keras')
def average_predictions(predictions_array):
    # Initialize variables to store accumulated predictions and count of frames
    avg_predictions_result = []

    # Dictionary to store accumulated predictions for each time frame
    time_frame_predictions = {}

    # Dictionary to store the count of arrays contributing to each time frame
    time_frame_counts = {}

    # Iterate over the predictions array
    for index, (start_time, end_time, predictions) in enumerate(predictions_array):
        # Determine the integer time frames covered by the current prediction
        start_frame = int(start_time)
        end_frame = int(end_time)

        # Update the accumulated predictions and count for each covered time frame
        for i in range(start_frame, end_frame + 1):
            if i not in time_frame_predictions:
                time_frame_predictions[i] = [0, 0, 0, 0, 0, 0, 0]
                time_frame_counts[i] = 0
            for j in range(len(predictions)):
                if end_time == i:
                    if time_frame_counts[i]>=0:
                        # print('here')
                        time_frame_counts[i] -= 1
                    if (index == len(predictions_array)-1):
                        time_frame_predictions[i].pop()
                    continue
                time_frame_predictions[i][j] += predictions[j]
            time_frame_counts[i] += 1

        # If end_time is an integer, exclude the next frame from the calculations


    # Compute the average predictions for each time frame
    for time_frame, predictions in time_frame_predictions.items():
        count = time_frame_counts[time_frame]
        if len(predictions)!=0 and count!=0:
            avg_predictions = [p / count for p in predictions]
            

            avg_predictions_result.append((float(time_frame), float(time_frame + 1), avg_predictions))



    return avg_predictions_result


def process_video(video_path):
   
    print('Anlayzing video frames...')
    video_capture = cv2.VideoCapture(video_path)
    frame_rate = video_capture.get(cv2.CAP_PROP_FPS)
    flag = 0
    j = 1

    timeframes_with_emotions = []
    
    while True:
        ret, frame = video_capture.read()

        if not ret:
            break

        # Process every 15th frame
        if j % 10 == 0:
            face_index = 0

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            rects = face_detect(gray, 1)

            for (i, rect) in enumerate(rects):
                shape = predictor_landmarks(gray, rect)
                shape = face_utils.shape_to_np(shape)

                (x, y, w, h) = face_utils.rect_to_bb(rect)
                face = gray[y:y + h, x:x + w]

                if face is not None and face.size != 0:
                    face = zoom(face, (shape_x / face.shape[0], shape_y / face.shape[1]))
                    face = face.astype(np.float32)
                    face /= float(face.max())
                    face = np.reshape(face.flatten(), (1, 48, 48, 1))
                    prediction = image_model.predict(face)
                else:
                    prediction = np.zeros((1, 7))
                timeframes_with_emotions.append((j - 1, j, prediction.flatten().tolist()))
                prediction_result = np.argmax(prediction)


                #emotions = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"]
                #detected_emotion = emotions[prediction_result]
                #cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                #cv2.putText(frame, detected_emotion, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 2)

        j += 1

    video_capture.release()
    cv2.destroyAllWindows()

    res = []
    for start_frame, end_frame, prediction in timeframes_with_emotions:
        start_time = start_frame / frame_rate
        end_time = end_frame / frame_rate

        #predicted_labels = np.argmax(prediction)
        #predicted_emotion = np.array(emotions)[predicted_labels.astype(int)]
        #print(f"Video: {i * 1.0} to {(i + 1) * 1.0} -  Predicted Emotion: {predicted_emotion}")
        res.append((start_time, end_time, prediction))





    return average_predictions(res)