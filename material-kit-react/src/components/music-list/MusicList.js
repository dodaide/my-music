import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';

function MusicList() {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/songs')
      .then(response => response.json())
      .then(data => {
        data.forEach((text) => {
          let tenBai = text.tenBaiHat
          tenBai = tenBai.toLowerCase();
          tenBai = tenBai.charAt(0).toUpperCase() + tenBai.slice(1);
          text.tenBaiHat = tenBai;
        })
        setMusicList(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - musicList.length) : 0;

  return (
    <>
        <Typography variant="h4" gutterBottom>
            Thư viện nhạc
        </Typography>
        <Card>
            <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                <TableBody>
                    {musicList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                    {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={musicList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    </>
  );
}

export default MusicList;