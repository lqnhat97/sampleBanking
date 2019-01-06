var db= require('../DB/db');

exports.getAllHistories = ()=> {
    var sql = `select * from history;`;
    return db.load(sql);
}

exports.insertNewHistories = (receiver, sender,requestBody) =>{
    var sql = `insert into history(stkSenter,idBank,stkReceiver,tradingTime,amount,transactionFee,content,typeFee)
     values('${sender.soTaiKhoan}',null,'${receiver.soTaiKhoan}','${requestBody.tradingTime}',${requestBody.amount},${requestBody.transactionFee},'${requestBody.content}',${requestBody.typeFee});`
    return db.insert(sql);
}

exports.getHistoryBySoTaiKhoan = (param) =>{
    var sql = `select * from history where stkSenter = '${param}' or stkReceiver = '${param}';`
    return db.load(sql);
}
