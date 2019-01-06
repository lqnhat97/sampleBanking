var db= require('../DB/db');

exports.getAllDirectories = ()=> {
    var sql = `select * from directory;`;
    return db.load(sql);
}