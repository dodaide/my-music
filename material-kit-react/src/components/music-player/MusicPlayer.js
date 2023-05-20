import { useState } from 'react';
import clsx from 'clsx';
// @mui
import {Typography} from '@mui/material';
import styles from "./MusicPlayer.module.css";
// components
import Iconify from '../iconify';
// import AudioWaveform from '../components/wave';

function DetailSong({song = {}}) {

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProGress] = useState(0);
  const [audioVolumn, setAudioVolumn] = useState(localStorage.getItem('myVolumn')||100);

  const pauseSong = (doPlay) => {
    const audio = document.getElementById('audio');
    if(doPlay){
      setIsPlaying(true);
      audio.play();
    }
    else{
      setIsPlaying(false);
      audio.pause();
    }
  };

  const updateCurentTime = (e) => {
    setProGress(e.target.value)
    const audio = document.getElementById('audio');
    const seekTime = audio.duration/100 * e.target.value 
    audio.currentTime = seekTime
  }

  const updateCurentProgress = () => {
    const audio = document.getElementById('audio');
    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
    setProGress(progressPercent)
  }

  const changeVolumn = (e) => {
    const audio = document.getElementById('audio');
    const audioValue = e.target.value;
    audio.volume = audioValue/100
    setAudioVolumn(audioValue)
    localStorage.setItem('myVolumn', audioValue);
  }

  return (
    <>
        <div className={styles.container}>
          <Typography variant="h3" gutterBottom>
            {song.tenBaiHat} - {song.tenTacGia}
          </Typography>
          <div className={styles.player}>
            <div className={styles.musicContainer}>
              <img src={song.sourceImg} alt="" />
              <div className={styles.progressMusic}>
                  <input id="progress" className={styles.progress} type="range" step="1" min="0" max="100" value={progress||0} onChange={updateCurentTime}/>
                  <audio id="audio" autoPlay src={song.sourceMusic} onTimeUpdate={updateCurentProgress}>
                    <track kind="captions" src={song.loiBaiHat} label="English" srcLang="en" />
                  </audio>
              </div>
              <div className={styles.playBtn}>
                {isPlaying ? (
                  <Iconify className={styles.playIcon} onClick={() => {pauseSong(false)}} icon="material-symbols:pause" />
                ) : (
                  <Iconify className={styles.playIcon} onClick={() => {pauseSong(true)}} icon="material-symbols:play-arrow-rounded" />
                )}
                <Iconify style={{marginLeft: "20px"}} className={styles.playIcon} icon="ic:baseline-volume-up" />
                <input type="range" step="1" min="0" max="100" value={audioVolumn} onChange={changeVolumn}/>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          <h1>Audio Waveform</h1>
          <canvas>

          <AudioWaveform audioUrl={song.sourceMusic||"https://storage.googleapis.com/ltat_sounddata/Cho-Toi-Lang-Thang-Ngot-Den.mp3"} />
          </canvas>
        </div> */}
        <div className={styles.options}>
            <div className={clsx(styles.selectOptions, styles.hover)}>
                <Iconify icon="material-symbols:heart-plus" />Thêm vào
            </div>
            <div className={clsx(styles.selectOptions, styles.hover)}>
                <Iconify icon="ic:baseline-download" />Tải nhạc
            </div>
            <div className={clsx(styles.selectOptions, styles.hover)}>
                <Iconify icon="material-symbols:share" />Chia sẻ
            </div>
            <div className={clsx(styles.selectOptions, styles.hover)}>
                <Iconify icon="material-symbols:headphones" />Nhạc chờ
            </div>
        </div>
        <div className={styles.lyrics}>
            <h2  className={styles.songName}>Lời bài hát: {song.tenBaiHat}</h2>
            <span className={styles.singer}>Nhạc sĩ: {song.tenTacGia}</span>
            <p dangerouslySetInnerHTML={{ __html: song.loiBaiHat }} className={styles.songLyrics} />
        </div>
    </>
  );
}

export default DetailSong;