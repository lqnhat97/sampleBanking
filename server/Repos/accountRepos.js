var db= require('../DB/db');

exports.getAllAccounts = ()=> {
    var sql = `select * from account;`;
    return db.load(sql);
}

exports.getAccountsById = (body)=> {
    var sql = `select * from account where idUser = '${body.idUser}';`;
    return db.load(sql);
}