const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const songsController = require('./controllers/SongsController');

const app = express();
// Sử dụng middleware CORS
app.use(cors());
app.use(morgan('combined'));
const port = 3001;

app.get('/api/songs', songsController.getListSong);

app.get('/api/topSongs', songsController.getTop10);

app.get('/api/songs/:id', songsController.findByID);

app.get('/api/:id/playlists', songsController.getPlayList);

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
