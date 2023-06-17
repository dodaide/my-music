from controller.fingerPrint import fingerprint
from model.db import DB
from pydub import AudioSegment

if __name__ == '__main__':
    for i in range(2, 11, 1):
        audio_data = AudioSegment.from_file(f'music/{i}.mp3')
        channel_samples = audio_data.get_array_of_samples()
        fin = fingerprint(channel_samples)
        id = i
        for i in range(0, len(fin) - 1000, 1000):
          split_values = fin[i:i + 1000]
          new_arr = []
          for item in split_values:
              new_item = (item[0], id, item[1])
              new_arr.append(new_item)

          db = DB()
          db.store_finger(new_arr)
    print("done!")