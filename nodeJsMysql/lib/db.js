var mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Lkz*028web',
    database:'opentutorials'
});
db.connect();

module.exports = db;