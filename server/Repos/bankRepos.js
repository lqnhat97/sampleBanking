var db= require('../DB/db');

exports.getAddressById=(body)=>{
    var sql = `select * from bank where idBank= ${body.idBank};`;
    return db.load(sql);
}