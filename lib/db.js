var db = require('mysql2-promise')();
db.configure({
    "host": "localhost",
    "user": "root",
    "password": "@Concac8892",
    "database": "db_forum"
});
module.exports = db;