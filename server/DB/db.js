var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        database: 'myebank'
    });
}

exports.load = (sql) => {
    return new Promise((resolve, reject ) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
                result = rows;
            }

            cn.end();
        });
    });
}

exports.insert = sql => {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}

exports.update = sql => {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}