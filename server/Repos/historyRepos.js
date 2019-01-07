var db= require('../DB/db');

exports.getAllHistories = ()=> {
    var sql = `select * from history;`;
    return db.load(sql);
}

exports.insertNewHistories = (receiver, sender,requestBody,tradingTime) =>{
    var sql = `insert into history(stkSenter,idBank,stkReceiver,tradingTime,amount,transactionFee,content,typeFee)
     values('${sender.soTaiKhoan}','${requestBody.idBank}',${receiver.soTaiKhoan},'${tradingTime}',${requestBody.amount},${requestBody.transactionFee},'${requestBody.content}',${requestBody.typeFee});`
    console.log(sql);
     return db.insert(sql);
}

exports.getHistoryBySoTaiKhoan = (param) =>{
    var sql = `select * from history where stkSenter = '${param}' or stkReceiver = '${param}';`
    return db.load(sql);
}
