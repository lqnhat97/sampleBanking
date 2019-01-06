var db= require('../DB/db');

exports.getAllAccounts = ()=> {
    var sql = `select * from account;`;
    return db.load(sql);
}

exports.getAccountsById = (body)=> {
    var sql = `select * from account where idUser = '${body.idUser}';`;
    return db.load(sql);
}

exports.insertAccount = (body) =>{
    var sql= `insert into account(userName,passwords,email,cnmd,dienthoai,isActive) values ('${body.userName}','${body.passwords}','${body.email}','${body.cmnd}','${body.dienthoai}',true);`
    return db.insert(sql); 
}