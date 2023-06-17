from pydub import AudioSegment
from pydub.silence import split_on_silence

async def saveRecordFile(audio_file, file_name):
    audio = await preprocessAudio(audio_file)
    await saveAudioFile(audio, file_name)

async def preprocessAudio(audio_file):
    audio = AudioSegment.from_file(audio_file)

    # # Remove noise
    # audio = removeNoise(audio)
    #
    # # Normalize volume
    # audio = normalizeVolume(audio)
    #
    # # Trim silence
    # audio = trimSilence(audio)

    return audio

def removeNoise(audio):
    # Implement noise removal logic here
    audio = audio.low_pass_filter(2000)
    return audio

def normalizeVolume(audio):
    # Calculate target dBFS for normalization
    target_dBFS = -20

    # Adjust audio volume to target dBFS
    change_in_dBFS = target_dBFS - audio.dBFS
    audio = audio.apply_gain(change_in_dBFS)

    return audio

def trimSilence(audio):
    # Split audio on silence and keep only segments with non-silent parts
    audio_segments = split_on_silence(audio, min_silence_len=500, silence_thresh=-40)

    # Concatenate non-silent segments
    audio = audio_segments[0]
    for segment in audio_segments[1:]:
        audio += segment

    return audio


async def saveAudioFile(audio, file_name):
    audio.export(file_name, format='mp3')