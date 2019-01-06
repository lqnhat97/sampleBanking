var express = require('express'),
    paymentAccountRepos = require('../Repos/paymentAccountRepos'),
    rn = require('random-number');
var router = express.Router();

router.post('/ExternalGetPaymentAccountByNumber',(req,res)=>{
    var body = { soTaiKhoan: req.body.accountNumber};
    paymentAccountRepos.getPaymentAccountByStk(body).then(rows =>{
        if(rows.length > 0){
            res.json(rows[0]);
        }
        else {
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



router.post('/createPaymentAccount',function createPaymentAccount(req,res){
    var options = {
        min:  1000000000000
      , max:  10000000000000
      , integer: true
      }
    paymentAccountRepos.insertPaymentAccount(req.body,rn(options)).then(() =>{
        res.statusCode = 200;
        res.end('Done'); 
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
        createPaymentAccount(req,res);
    })
})

module.exports = router;