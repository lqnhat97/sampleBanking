var db = require('../db/db');
exports.loginEmployee = (loginEntity) =>{
    var sql = `select * from employees where userName = '${loginEntity.userName}'and passwords ='${loginEntity.passwords}';`;
    return  db.load(sql);
}

exports.loginAccount = (loginEntity) =>{
    var sql = `select * from account where userName = '${loginEntity.userName}'and passwords ='${loginEntity.passwords}';`;
    return  db.load(sql);
}