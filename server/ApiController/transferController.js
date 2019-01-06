var express = require('express'),
historyRepos = require('../Repos/historyRepos'),
accountRepos = require('../Repos/accountRepos'),
paymentAccountRepos = require('../Repos/paymentAccountRepos');
var router = express.Router();

router.post('/internal', async (req, res) => {
    var senderBody = {
        soTaiKhoan: req.body.SoTaiKhoanGui
    }
    var senderPaymentAccount;
    await paymentAccountRepos.getPaymentAccountByStk(senderBody).then(rows => {
        console.log(rows);
            senderPaymentAccount = rows[0];
    })
    console.log(senderPaymentAccount);
    var receiverBody = {
        soTaiKhoan: req.body.SoTaiKhoanNhan
    }
    var receiver ;
    await paymentAccountRepos.getPaymentAccountByStk(receiverBody).then(rows =>{
        receiver = rows[0];
    });
    if (req.body.typeFee == 0) {
        var newSoDu = receiver.soDu + req.body.amount - req.body.transactionFee;

        var desSoDu = senderPaymentAccount.soDu - req.body.amount;

    } else if(req.body.typeFee == 1){
        var newSoDu = receiver.soDu + req.body.amount;

        var desSoDu = senderPaymentAccount.soDu - req.body.amount - req.body.transactionFee;

    }
    await paymentAccountRepos.setSoDu(receiver, newSoDu);
    await paymentAccountRepos.setSoDu(senderPaymentAccount, desSoDu);
    console.log(receiver);
    console.log(senderPaymentAccount);
    await historyRepos.insertNewHistories(receiver, senderPaymentAccount, req.body);
    res.json({status:200});
})
module.exports = router;