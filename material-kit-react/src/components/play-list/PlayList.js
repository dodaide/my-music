import { Link } from 'react-router-dom';
// @mui
import {Grid, Card, CardContent, Typography} from '@mui/material';
import styles from "./PlayList.module.css";

function PlayList({playList = {}, song = {}}) {
  
  return (
    <>
        <div className={styles.playList}>
            <Typography variant="h3" gutterBottom>
              Album của {song.tenTacGia}
            </Typography>
            <Grid container spacing={3}>
              {playList.map((song) => (
                <Grid key={song.id} className="song" item xs={12} sm={6} md={3}>
                  <Link className={styles.songLink} to={`/songs/${song.id}`}>
                    <Card>
                      <img className={styles.playListSong} src={song.sourceImg} alt={song.tenBaiHat} />
                      <CardContent sx={{pt: 4}}>
                        <h4 className={styles.playListTitle}>{song.tenBaiHat}</h4>
                        <Typography>{song.tenTacGia}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
        </div>
    </>
  );
}

export default PlayList;