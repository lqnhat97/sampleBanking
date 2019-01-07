var express = require('express'),
    accountRepos = require('../Repos/accountRepos'),
    rn = require('random-number'),
    paymentAccount = require('../Repos/paymentAccountRepos');
var router = express.Router();

router.get('/', (req, res) => {
    accountRepos.getAllAccounts().then(row => {
        if (row.length > 0) {
            res.json(row);
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

router.post('/createAccount', (req, res) => {
    accountRepos.insertAccount(req.body).then(value => {
        accountRepos.getAllAccounts().then(value => {
            var options = {
                min: 1000000000000,
                max: 10000000000000,
                integer: true
            }
            paymentAccount.insertPaymentAccount(value[value.length-1], rn(options)).then(() => {
                res.statusCode = 200;
                res.end('Done');
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('View error log on console');
            })
        })
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})

module.exports = router;