var express = require('express'),
    paymentAccountRepos = require('../Repos/paymentAccountRepos');
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

module.exports = router;