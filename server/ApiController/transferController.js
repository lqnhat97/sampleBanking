var express = require('express'),
    historyRepos = require('../Repos/historyRepos'),
    bankRepos = require('../Repos/bankRepos'),
    accountRepos = require('../Repos/accountRepos')
    axios = require('axios'),
    moment=require('moment'),
    paymentAccountRepos = require('../Repos/paymentAccountRepos');
var router = express.Router();

router.post('/internal', async (req, res) => {
    var senderBody = {
        soTaiKhoan: req.body.SoTaiKhoanGui
    }
    var senderPaymentAccount;
    await paymentAccountRepos.getPaymentAccountByStk(senderBody).then(rows => {
        senderPaymentAccount = rows[0];
    })
    console.log(senderPaymentAccount);
    console.log(req.body.amount + req.body.transactionFee);
    if (senderPaymentAccount.soDu >= (parseFloat(req.body.amount) + parseFloat(req.body.transactionFee))) {
        var receiverBody = {
            soTaiKhoan: req.body.SoTaiKhoanNhan
        }
        var receiver;
        await paymentAccountRepos.getPaymentAccountByStk(receiverBody).then(rows => {
            receiver = rows[0];
        });
        if (req.body.typeFee == 0) {
            var newSoDu = parseFloat(receiver.soDu) + parseFloat(req.body.amount) - parseFloat(req.body.transactionFee);

            var desSoDu = parseFloat(senderPaymentAccount.soDu) - parseFloat(req.body.amount);

        } else if (req.body.typeFee == 1) {
            var newSoDu = parseFloat(receiver.soDu) + parseFloat(req.body.amount);
            var desSoDu = parseFloat(senderPaymentAccount.soDu) - parseFloat(req.body.amount) - parseFloat(req.body.transactionFee);

        }
        await paymentAccountRepos.setSoDu(receiver, newSoDu);
        await paymentAccountRepos.setSoDu(senderPaymentAccount, desSoDu);
        console.log(receiver);
        console.log(senderPaymentAccount);
        var tradingTime = moment().format("YYYY-MM-DD HH:mm:ss");
        await historyRepos.insertNewHistories(receiver, senderPaymentAccount, req.body,tradingTime);
        accountRepos.getAccountsById(receiver).then(value =>{
            res.json({
                userName: value[0].userName,
                email: value[0].email,
                dienthoai: value[0].dienthoai
            })
            //res.status(200).send("Tranfer succeed");
        })
    } else {
        res.status(404).send("Not enough money");
    }
})

router.post('/external', async (req, res) => {
    await paymentAccountRepos.getPaymentAccountByStk(req.body).then(rows => {
        senderPaymentAccount = rows[0];
    })
    if (senderPaymentAccount.soDu >= (parseFloat(req.body.amount) + parseFloat(req.body.transactionFee))) {
       await bankRepos.getAddressById(req.body).then(value => {
            axios.post('http://localhost:3001/sendTransaction', {
                address: value[0].address,
                amount: req.body.amount,
                accountFrom: {
                    id: req.body.soTaiKhoan,
                    idBank: 777
                },
                accountTo: {
                    id: req.body.idReceiver,
                    idBank: req.body.idBank
                }
            }).then(value =>{
                console.log(value.data);
            })
        })
        var tradingTime = moment().format("YYYY-MM-DD HH:mm:ss");
        var receiver = { soTaiKhoan: null};
        await historyRepos.insertNewHistories(receiver,senderPaymentAccount,req.body,tradingTime);
    }
})


module.exports = router;