const connection = require('../db');

class Song{
    
    constructor(id, title, artist, imageUrl, audioUrl) {
        this.id = id || '';
        this.title = title || '';
        this.artist = artist || '';
        this.imageUrl = imageUrl || '';
        this.audioUrl = audioUrl || '';
    }
    
    find(result){
        const myQuery = `
        SELECT tblthongtinbaihat.id AS id, tenBaiHat, tenTacGia, theLoai, loai,thoiLuong, namSangTac,
        soLuotNghe, loiBaiHat, tblthongtinbaihat.source AS sourceMusic, tblanh.source AS sourceImg
        FROM tblthongtinbaihat
        JOIN tblanh
        ON tblanh.id = tblthongtinbaihat.idAnh
        WHERE tblthongtinbaihat.id = ?`;
        connection.query(myQuery,[this.id], result);
    }

    getList(result){
        const myQuery = `
        SELECT tblthongtinbaihat.id AS id, tenBaiHat, tenTacGia, soLuotNghe, tblanh.source AS sourceImg
        FROM tblthongtinbaihat
        JOIN tblanh
        ON tblanh.id = tblthongtinbaihat.idAnh`;
        connection.query(myQuery, result);
    }

    playList(result){
        const myQuery = `
        SELECT tblthongtinbaihat.id AS id, tenBaiHat, tenTacGia, tblanh.source AS sourceImg
        FROM tblthongtinbaihat
        JOIN tblanh
        ON tblanh.id = tblthongtinbaihat.idAnh
        WHERE tblthongtinbaihat.tenTacGia = (SELECT tenTacGia FROM tblthongtinbaihat WHERE id = ?)
        ORDER BY RAND()
        LIMIT 4;`;
        connection.query(myQuery,[this.id], result);
    }

    top10(result){
        const myQuery = `
        SELECT tblthongtinbaihat.id AS id, tenBaiHat, tblanh.source AS sourceImg
        FROM tblthongtinbaihat
        JOIN tblanh
        ON tblanh.id = tblthongtinbaihat.idAnh
        ORDER BY soLuotNghe DESC
        LIMIT 10`;
        connection.query(myQuery, result);
    }
}

module.exports = Song;