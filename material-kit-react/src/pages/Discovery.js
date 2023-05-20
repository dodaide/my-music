import { Helmet } from 'react-helmet-async';
// @mui
import {Container} from '@mui/material';
// components
import Top10Song from '../components/top10song';
import MusicList from '../components/music-list';

function Discovery() {
  
  return (
    <>
      <Helmet>
        <title> Khám phá | My Music </title>
      </Helmet>

      <Container>
        <Top10Song />
        <MusicList />
      </Container>
    </>
  );
}

export default Discovery;