var express = require('express');
var userRepos = require('../Repos/userRepos');
var paymentAccoutntRepo = require('../Repos/paymentAccountRepos')
var authRepos = require('../Repos/authRepos');
var router = express.Router();

router.post('/', (req, res) => {
    if (req.body.role == 0) {
        userRepos.loginAccount(req.body, res).then(rows => {
            if (rows.length > 0) {
                var userEntity = rows[0];
                var acToken = authRepos.generateAccessToken(userEntity);
                var rfToken = authRepos.generateRefreshToken();
                authRepos.insertAccountRefreshToken(userEntity.idUser, rfToken).then(value => {
                    var thisAccountPaymentAccount;
                    paymentAccoutntRepo.getPaymentAccountByIdUser(userEntity).then(rows => {
                        
                        thisAccountPaymentAccount = rows;
                        res.json({
                            auth: true,
                            user: userEntity,
                            role: req.body.role,
                            paymentAccount: thisAccountPaymentAccount,
                            id:userEntity.idUser,
                            access_token: acToken,
                            refresh_token: rfToken
                        });
                    });
                }).catch(err => {
                    console.log(err);
                    res.statusCode = 500;
                    res.end('View error log on console');
                })
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
    } else if (req.body.role == 1) {
        userRepos.loginEmployee(req.body, res).then(rows => {
            if (rows.length > 0) {
                var userEntity = rows[0];
                console.log(userEntity);
                var acToken = authRepos.generateAccessToken(userEntity);
                var rfToken = authRepos.generateRefreshToken();
                authRepos.insertRefreshToken(userEntity.idEmployees, userEntity.typeEmployees, rfToken).then(value => {
                    res.json({
                        auth: true,
                        user: userEntity,
                        role: userEntity.typeEmployees,
                        id:userEntity.idEmployees,
                        access_token: acToken,
                        refresh_token: rfToken
                    });
                }).catch(err => {
                    console.log(err);
                    res.statusCode = 500;
                    res.end('View error log on console');
                })
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
    }
})

router.post('/reCheckToken', (req, res) => {
    authRepos.reCheckToken(req.body, res).then(rows => {
        if (rows.length > 0) {
            res.json({
                auth: true,
                idEmployee: req.body.idEmployee,
                access_token: authRepos.generateAccessToken(rows[0]),
                refresh_token: req.body.refresh_token
            })
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

router.post('/reCheckAccountToken', (req, res) => {
    authRepos.reCheckAccountToken(req.body, res).then(rows => {
        if (rows.length > 0) {
            res.json({
                auth: true,
                idUser: req.body.idUser,
                access_token: authRepos.generateAccessToken(rows[0]),
                refresh_token: req.body.refresh_token
            })
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

module.exports = router;