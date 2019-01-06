var express = require('express'),
    paymentAccountRepos = require('../Repos/paymentAccountRepos'),
    rn = require('random-number');
var router = express.Router();

router.post('/ExternalGetPaymentAccountByNumber', (req, res) => {
    var body = {
        soTaiKhoan: req.body.accountNumber
    };
    paymentAccountRepos.getPaymentAccountByStk(body).then(rows => {
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.json({
                auth: false
            })
        }
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})

router.post('/createPaymentAccount', function createPaymentAccount(req, res) {
    var options = {
        min: 1000000000000,
        max: 10000000000000,
        integer: true
    }
    paymentAccountRepos.insertPaymentAccount(req.body, rn(options)).then(() => {
        res.statusCode = 200;
        res.end('Done');
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
        createPaymentAccount(req, res);
    })
})

router.delete('/deletePaymentAccount', (req, res) => {
    paymentAccountRepos.getPaymentAccountByIdUser(req.body).then(rows => {
        if (rows.length > 1) {
            var paymentToDelete;
            paymentAccountRepos.getPaymentAccountByStk(req.body).then(rows => {
                paymentToDelete = rows[0];
                console.log(paymentToDelete);
                if (paymentToDelete.soDu == 0 && paymentToDelete.idUser == req.body.idUser) {
                    paymentAccountRepos.deletePaymentAccount(req.body).then(() => {
                        res.statusCode = 200;
                        res.end('Done');
                    }).catch(err => {
                        console.log(err);
                        res.statusCode = 500;
                        res.end('View error log on console');
                    })
                } else {
                    res.statusCode = 404;
                    res.end('You still have money in your account');
                }
            })
        } else {
            res.statusCode = 404;
            res.end('You only have one account');
        }
    })
})

router.put('/recharge', (req, res) => {
    paymentAccountRepos.getPaymentAccountByStk(req.body).then(rows => {
        paymentAccountRepos.setSoDu(req.body, parseFloat(req.query.amount) + parseFloat(rows[0].soDu)).then(() => {
            res.statusCode = 200;
            res.end('Done');
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console');
        })
    })
})

router.get('/',(req,res)=>{
    paymentAccountRepos.getAllPaymentAccount().then(rows=>{
        if(rows.length>0){
            res.json(rows);
        }
        else{
            res.statusCode = 400;
            res.end('Error');
        }
    })
})

router.get('/InfoByStk',(req,res)=>{
    console.log(req.body);
    paymentAccountRepos.getAccountInfoFromStk(req.query.soTaiKhoan).then(rows=>{
        if(rows.length>0){
            res.json(rows);
        }
        else{
            res.statusCode = 400;
            res.end('Error');
        }
    }).catch(err=>{
        res.statusCode = 500;
        res.end('Error');
    })
})
module.exports = router;