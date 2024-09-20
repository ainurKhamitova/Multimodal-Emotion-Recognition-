
from emotion_recognition.video_model.imageModel import process_video
from emotion_recognition.audio_model.audioModel import process_audio
from emotion_recognition.text_model.textModel import process_text
import numpy as np
def late_fusion(audio_results, image_results, text_results):


    combined_results = []
    emotions = ['angry', 'disgust', 'fear', 'happy','sad', 'surprise', 'neutral']
    
    # Iterate through audio_results
    for audio_entry in audio_results:
        audio_start, audio_end, audio_predictions = audio_entry

        # Find matching entry in image_results
        for image_entry in image_results:
            image_start, image_end, image_predictions = image_entry

            # Find matching entry in text_results
            for text_entry in text_results:
                text_start, text_end, text_predictions = text_entry

                # If start and end indices match for all modalities, combine predictions
                if audio_start == image_start == text_start and audio_end == image_end == text_end:
                    result_list = [image_predictions, audio_predictions, text_predictions]

                    # Convert the lists to numpy arrays
                    combined_predictions = np.array([np.array(result_list) for result_list in result_list])

                    # Calculate the mean across the first axis (axis=0)
                    combined_predictions = np.mean(combined_predictions, axis=0)

                    # Find the maximum prediction index and use it to get the corresponding emotion label
                    max_index = np.argmax(combined_predictions)
                    emotion_label = emotions[max_index]

                    combined_results.append((audio_start, audio_end, emotion_label))
                    break

    return combined_results


def mer_model(video_path):

    audio_results = process_audio(video_path)
    image_results = process_video(video_path)
    text_results = process_text(video_path)
    # print(audio_results)
    # print(image_results)
    combined_results = late_fusion(audio_results, image_results, text_results)

    print(combined_results)
    merged_emotions = []

    current_start, current_end, current_emotion = combined_results[0]

    for start, end, emotion in combined_results[1:]:
      if emotion == current_emotion:
          current_end = end
      else:
          merged_emotions.append((current_start, current_end, current_emotion))
          current_start, current_end, current_emotion = start, end, emotion

    # Append the last emotion
    merged_emotions.append((current_start, current_end, current_emotion))

    return merged_emotions