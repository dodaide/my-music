const Song = require('../models/Song')

class SongsController{
    findByID(req, res){
      const id = req.params.id;
      const mySong = new Song(id);
      mySong.find((err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error' });
        }
        else {
          console.log(results);
          res.json(results[0]);
        }
      })
    }

    getListSong(req, res){
      const mySong = new Song();
      mySong.getList((err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error' });
        }
        else {
          console.log(results);
          res.json(results);
        }
      })
    }

    getPlayList(req, res){
      const id = req.params.id;
      const mySong = new Song(id);
      mySong.playList((err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error' });
        }
        else {
          console.log(results);
          res.json(results);
        }
      })
    }

    getTop10(req, res){
      const mySong = new Song();
      mySong.top10((err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error' });
        }
        else {
          console.log(results);
          res.json(results);
        }
      })
    }
}

module.exports = new SongsController; 