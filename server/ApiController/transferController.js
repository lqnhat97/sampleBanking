var express = require('express');
historyRepos = require('../Repos/historyRepos');
accountRepos = require('../Repos/accountRepos');
paymentAccountRepos = require('../Repos/paymentAccountRepos');
var router = express.Router();

router.post('/internal', (req, res) => {
    var senderBody = {
        soTaiKhoan: req.body.SoTaiKhoanGui
    }
    var senderPaymentAccount;
    paymentAccountRepos.getPaymentAccountByStk(senderBody).then(rows => {
        if(rows.lenght>0){
            senderPaymentAccount = rows[0];
        }
    })
    console.log(senderPaymentAccount);
    var receiverBody = {
        soTaiKhoan: req.body.SoTaiKhoanNhan
    }
    var receiver = paymentAccountRepos.getPaymentAccountByStk(receiverBody);
    if (req.body.typeFee == 0) {
        var newSoDu = receiver.soDu + req.body.amount - req.body.transactionFee;

        var desSoDu = senderPaymentAccount.soDu - req.body.amount;

    } else if(req.body.typeFee == 1){
        var newSoDu = receiver.soDu + req.body.amount;

        var desSoDu = senderPaymentAccount.soDu - req.body.amount - req.body.transactionFee;

    }
    paymentAccountRepos.setSoDu(receiver, newSoDu);
    paymentAccountRepos.setSoDu(senderPaymentAccount, desSoDu);
    console.log(receiver);
    console.log(senderPaymentAccount);
    historyRepos.insertNewHistories(receiver, senderPaymentAccount, req.body);

})
module.exports = router;