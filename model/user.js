const db = require("../lib/db");
var user = {
    getAll: async function(){
        return await db.query('SELECT * FROM users');
    },
    getById: async function(id){
        return await db.query(`SELECT * FROM users where user_id = ${id}`);
    },
    getByName: async function(userName){
        return await db.query('SELECT * FROM users where user_name = ?', [userName]);
    },
    getByEmail: async function(email){
        return await db.query(`SELECT * FROM users where user_email = ${email}`);
    },
    create: async function(userName, userEmail, userPass){
        await db.execute(`INSERT INTO users(user_name, user_email, user_pass) values (?, ?, ?)`, [userName, userEmail, userPass]);
    },
    checkNameAndEmail: async function(userName, userEmail){
        return await db.query('SELECT * FROM users where user_name = ? OR user_email = ?', [userName, userEmail]);
    },
    getByEmailAndPass: async function(userEmail, userPass){
        return await db.query('SELECT * FROM users where user_email = ? and user_pass = ?', [userEmail, userPass]);
    }
}
module.exports = user;