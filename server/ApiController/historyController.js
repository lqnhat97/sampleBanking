var express = require('express');
    historyRepos = require('../Repos/historyRepos.js');
var router = express.Router();

router.get('/',(req,res)=>{
    historyRepos.getAllHistories().then(row => {
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

router.get('/historyBySoTaiKhoan',(req,res)=>{
    historyRepos.gethistoryBySoTaiKhoan(req.query.soTaiKhoan).then(row => {
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
module.exports = router;