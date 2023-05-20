import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import {Container} from '@mui/material';
// components
import MusicPlayer from '../components/music-player';
import PlayList from '../components/play-list';
// import AudioWaveform from '../components/wave';

function DetailSong() {
  const [song, setSong] = useState({});
  const [playList, setPlaylist] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/songs/${id}`)
    .then(response => response.json())
    .then(data => {
      let tenBai = data.tenBaiHat
      tenBai = tenBai.toLowerCase();
      tenBai = tenBai.charAt(0).toUpperCase() + tenBai.slice(1);
      data.tenBaiHat = tenBai;

      data.loiBaiHat = data.loiBaiHat.replace(/\\n/g, '</br>')
      setSong(data)
    })
    .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/${id}/playlists`)
    .then(response => response.json())
    .then(listMusic => setPlaylist(listMusic))
    .catch(error => console.error(error));
  }, [id]);
  
  return (
    <>
      <Helmet>
        <title> {song.tenBaiHat || "Tên bài hát"} | My Music </title>
      </Helmet>

      <Container>
        <MusicPlayer song={song} />
        <PlayList playList={playList} song={song} />
      </Container>

    </>
  );
}

export default DetailSong;