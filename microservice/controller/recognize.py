from controller.fingerPrint import fingerprint
from model.db import DB
from controller.config import DEFAULT_FS

class Recognize:

  def find_matches(self, samples, Fs=DEFAULT_FS):
    db = DB()
    hashes = fingerprint(samples, Fs=Fs)
    mapper = {}
    for hash, offset in hashes:
      mapper[hash.upper()] = offset
    values = list(mapper.keys())

    for i in range(0, len(values) - 1000, 1000):
      split_values = values[i:i + 1000]
      x = db.executeAll(split_values)
      for hash, sid, offset in x:
        yield (sid, offset - mapper[hash.upper()])

  def align_matches(self, matches):
    db = DB()
    diff_counter = {}
    largest_count = 0
    song_id = -1

    for tup in matches:
      sid, diff = tup

      if diff not in diff_counter:
        diff_counter[diff] = {}

      if sid not in diff_counter[diff]:
        diff_counter[diff][sid] = 0

      diff_counter[diff][sid] += 1

      if diff_counter[diff][sid] > largest_count:
        largest_count = diff_counter[diff][sid]
        song_id = sid

    return db.get_song_by_id(song_id)