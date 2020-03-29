var db = require('mysql2-promise')();
db.configure({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "nodejs"
});
module.exports = db;