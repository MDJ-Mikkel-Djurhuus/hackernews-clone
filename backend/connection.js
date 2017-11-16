var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'admin',
    database: 'hackernews'
});
connection.getConnection(function(err, connection) {
    if (err) {
        console.log(err)
        connection.release();
        throw err;
    }
    console.log(connection.state)
});
module.exports = connection;