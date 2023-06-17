from flask import Flask, request
from controller.recognize import Recognize
from controller.savefile import saveRecordFile
from flask_cors import CORS
from pydub import AudioSegment
import os

app = Flask(__name__)
CORS(app)

@app.route('/find-audio', methods=['POST'])
async def save_audio():
    if 'audio' not in request.files:
        return 'No audio file found', 400

    audio_file = request.files['audio']
    fileName = 'whatsong.mp3'
    await saveRecordFile(audio_file, fileName)

    audio_data = AudioSegment.from_file(fileName)
    channel_samples = audio_data.get_array_of_samples()
    recognize = Recognize()

    matches = []
    matches.extend(recognize.find_matches(channel_samples))
    total_matches_found = len(matches)
    os.remove(fileName)

    if total_matches_found > 0:
        song = recognize.align_matches(matches)
        print(song)
        return song
    else:
        print("Not found")
        return "Not found", 404

if __name__ == '__main__':
    app.run()
