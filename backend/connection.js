var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'db',
    user: 'djur',
    password: 'admin',
    database: 'hackernews'
});
// connection.getConnection(function(err, connection) {
//     if (err) {
//         console.log(err)
//         connection.release();
//         throw err;
//     }
//     console.log(connection.state)
// });
// module.exports = connection;


var DB = (function () {
    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                if (connection)
                    connection.release();
                callback(err, null);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(null, rows);
                }
                else {
                    callback(err, null);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(err, null);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;