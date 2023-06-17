import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import {
  Table,
  Stack,
  Avatar,
  Button,
  Container,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  Input,
  Tabs,
  Tab,
  Grid,
  Divider
} from '@mui/material';
// components
import Iconify from '../components/iconify';

function Recorder(){
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [musicList, setMusicList] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [value, setValue] = useState(0);

  const handleCallApi = (myFile) => {
    const formData = new FormData();
    formData.append('audio', myFile);

    axios
      .post('http://127.0.0.1:5000/find-audio', formData)
      .then((response) => {
        setIsLoading(false);
        const {data} = response;
        data.forEach((text) => {
          let tenBai = text.tenBaiHat
          tenBai = tenBai.toLowerCase();
          tenBai = tenBai.charAt(0).toUpperCase() + tenBai.slice(1);
          text.tenBaiHat = tenBai;
        })
        setMusicList(data)
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error)
        setMusicList(null)
      });
  }

  const handleUpload = () => {
    if (selectedFile) {
      setIsLoading(true);
      handleCallApi(selectedFile)
    }
    else{
      alert("Chưa chọn file")
    }
  };

  const onStop = (recordedBlob) => {
    setIsLoading(true);
    handleCallApi(recordedBlob.blob)
  };

  const handleUpChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <Helmet>
        <title> Nhận diện bài hát | My Music </title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom>
          Nhận diện bài hát
        </Typography>
        <Tabs
          value={value}
          onChange={handleUpChange}
          variant="fullWidth"
          sx={{marginBottom: "20px"}}
        >
          <Tab label="Tải File lên" />
          <Tab label="Ghi âm" />
        </Tabs>
        {value === 0 ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Input
                  type="file"
                  accept="audio/*"
                  fullWidth
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" fullWidth disabled={isLoading} onClick={handleUpload}>
                  Tìm kiếm
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <div className='recordContainer'>
            <ReactMic
              record={isRecording}
              className="soundWave"
              onStop={onStop}
              strokeColor="#2065D1"
              backgroundColor="#e8ebee"
            />
            {isRecording ? (
              <Button className='recordButton' variant="contained" onClick={() => setIsRecording(false)}>
                    <Iconify width="40px" height="40px" icon="material-symbols:pause" />
              </Button>
            ) : (
              <Button className='recordButton' disabled={isLoading} variant="contained" onClick={() => setIsRecording(true)}>
                    <Iconify width="40px" height="40px" icon="material-symbols:play-arrow-rounded" />
              </Button>
            )}
          </div>
        )}
        {isLoading ? (
          <div className="load-3">
            <div className="line" />
            <div className="line" />
            <div className="line" />
          </div>
        ) : (
          musicList && (
            <TableContainer sx={{marginTop: "40px"}}>
              <Divider />
              <Typography variant="h4" gutterBottom>
                Bài hát đề xuất
              </Typography>
                <Table>
                  <TableBody>
                      {musicList.map((row) => {
                      const { id, tenBaiHat, tenTacGia, soLuotNghe, sourceImg} = row;

                      return (
                          <TableRow hover key={id} tabIndex={-1} role="checkbox">
                          <TableCell component="th" scope="row">
                              <Stack direction="row" alignItems="center" spacing={2}>
                              <Link className='SongThumbnail' to={`/songs/${id}`}>
                                  <Iconify className='SongIcPlay' icon={'material-symbols:play-arrow-rounded'} />
                                  <Avatar alt={tenBaiHat} src={sourceImg} />
                              </Link>
                              <Link className='SongLink' to={`/songs/${id}`}>
                                  <Typography variant="subtitle2" noWrap>
                                  {tenBaiHat}
                                  </Typography>
                              </Link>
                              </Stack>
                          </TableCell>

                          <TableCell align="left">{tenTacGia}</TableCell>
                          <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={2}>
                              <Iconify style={{fontSize: "30px"}} icon={'ic:baseline-remove-red-eye'} />
                              {soLuotNghe} view
                              </Stack>
                          </TableCell>

                          <TableCell align="right">
                              <IconButton size="large" color="inherit">
                              <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                          </TableCell>
                          </TableRow>
                      );
                      })}
                  </TableBody>
                </Table>
            </TableContainer>
          )
        )}
      </Container>
    </>
  );
};


export default Recorder;
