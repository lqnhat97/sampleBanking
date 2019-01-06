var db = require ('../DB/db')

exports.getPaymentAccountByStk= (body) => {
   
    var sql = `select * from payment_account where soTaiKhoan = '${body.soTaiKhoan}';`;
    console.log(sql);
    return db.load(sql);
}

exports.setSoDu = (body,newSoDu) =>{
    var sql = `update payment_account set soDu = '${newSoDu}' where soTaiKhoan = '${body.soTaiKhoan}';`;
    return db.update(sql);
}

exports.insertPaymentAccount = (body,gen) =>{
    var sql = `insert into payment_account(soTaiKhoan,soDu,idUser) values('${gen}',0,'${body.idUser}'); `
    return db.insert(sql);
}

