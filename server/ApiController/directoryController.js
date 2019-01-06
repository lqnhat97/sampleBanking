var express = require('express'),
    directoryRepos = require('../Repos/directoryRepos');
var router = express.Router();

router.get('/',(req,res)=>{
    directoryRepos.getAllDirectories().then(row => {
        if (row.length > 0) {
            res.json(row);
        } else {
            res.json({
                auth: false,
                quantity: 0
            })
        }
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
    })
})

module.exports=router;