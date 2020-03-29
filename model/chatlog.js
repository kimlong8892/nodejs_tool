const db = require("../lib/db");
var chatlog = {
    getAll: async function(){
        return await db.query('SELECT * FROM chatlog inner join users on chatlog.user_id = users.user_id');
    },
    add: async function(mess, user_id){
        return await db.execute('INSERT INTO chatlog(mess, user_id) values (?, ?)', [mess, user_id]);
    }
}
module.exports = chatlog;