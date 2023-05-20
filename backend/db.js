const mysql = require('mysql');

// Tạo kết nối với cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'music'
});

// Kết nối tới cơ sở dữ liệu MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = connection;