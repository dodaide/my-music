from pydub import AudioSegment
from controller.recognize import Recognize
from controller.fingerPrint import fingerprint

if __name__ == '__main__':
    audio_data = AudioSegment.from_file('music/test2.mp3')
    channel_samples = audio_data.get_array_of_samples()
    # fin = fingerprint(channel_samples)
    # print(fin)
    recognize = Recognize()

    matches = []
    matches.extend(recognize.find_matches(channel_samples))
    total_matches_found = len(matches)

    if total_matches_found > 0:
        songs = recognize.align_matches(matches)
        print(songs)