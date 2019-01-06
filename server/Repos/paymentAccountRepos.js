var db = require('../DB/db')

exports.getAllPaymentAccount = () => {
    var sql = `select * from payment_account;`;
    return db.load(sql)
}

exports.getAccountInfoFromStk = (body)=>{
    var sql = `select a.userName,a.email,a.dienthoai from payment_account p,account a where p.idUser = a.idUser and p.soTaiKhoan=${body};`;
    return db.load(sql)
}

exports.getPaymentAccountByStk = (body) => {

    var sql = `select * from payment_account where soTaiKhoan = '${body.soTaiKhoan}';`;
    console.log(sql);
    return db.load(sql);
}

exports.getPaymentAccountByIdUser = (body) => {
    var sql = `select * from payment_account where idUser = '${body.idUser}' and status = true;`;
    return db.load(sql);
}

exports.setSoDu = (body, newSoDu) => {
    var sql = `update payment_account set soDu = '${newSoDu}' where soTaiKhoan = '${body.soTaiKhoan}';`;
    return db.update(sql);
}

exports.insertPaymentAccount = (body, gen) => {
    var sql = `insert into payment_account(soTaiKhoan,soDu,idUser) values('${gen}',0,'${body.idUser}'); `
    return db.insert(sql);
}

exports.deletePaymentAccount = (body) => {
    var sql = `update payment_account set status = false where soTaiKhoan = '${body.soTaiKhoan}';`;
    return db.insert(sql);
}