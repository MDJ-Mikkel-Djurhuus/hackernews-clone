const path = require("path");
var db = require("../connection");

var User = {
    getAllUsers: function(callback) {
        console.log("getAllUsers")
        return db.query("Select * from user", callback);
    },
    getUserById: function(username, callback) {
        console.log("getUserById", username)
        return db.query("select * from user where username=? LIMIT 1", [username], callback);
    },
    addUser: function(User, callback) {
        console.log("addUser", User.username, User.pwd_hash)
        return db.query("Insert into user (username,pwd_hash,time) values (?,?,default)", [User.username, User.pwd_hash], callback);
    },
    deleteUser: function(username, User, callback) {
        console.log("deleteUser", username, User.pwd_hash)
        return db.query("delete from user where username=? AND pwd_hash=?", [username, User.pwd_hash], callback);
    },
    updateUser: function(username, User, callback) {
        console.log("updateUser", username, User)
        return db.query("update user set pwd_hash=? where username=?", [User.pwd_hash, username], callback);
    },
    login: function(User, callback) {
        console.log("login", User.username, User.pwd_hash)
        return db.query("select * from user where username=? AND pwd_hash=?", [User.username, User.pwd_hash], callback);
    },
    getUserScore: function(username, callback) {
        console.log("getUserScore", User.username, User.pwd_hash)
        let query = `SELECT post.username, SUM(value) as score
        FROM vote vote
        left join post post
        on vote.hanesst_id=post.hanesst_id
        where post.username=?
        group by post.username`
        return db.query(query, [username], callback);
    }

};
module.exports = User;