var axios = require('axios');
var express = require('express');
var router = express.Router();
var PUBLIC_KEY = '04d7479d0bd963294e302f721f2c76f88ece0da3c378e38f9e5e9a42d5fb56d1f3a457c74dae25b2b35247a5c1a0b3d12eb48e61f87354753b80bcc91c9fc5401f';
var LENGTH_TRANSACTION = 0;
router.get('/', (req, res) => {
    axios.get('http://localhost:3001/address').then(value => {
        res.json(value.data);
        res.statusCode = 200;
    })
})

router.get('/balance', (req, res) => {
    axios.get('http://localhost:3001/balance').then(value => {
        res.json(value.data);
        res.statusCode = 200;
    })
})

router.get('/transactionPool', (req, res) => {
    axios.get('http://localhost:3001/transactionPool').then(value => {
        res.json(value.data);
        res.statusCode = 200;
    })
})

router.get('/unspentTransactionOutputs', (req, res) => {
    axios.get('http://localhost:3001/unspentTransactionOutputs').then(value => {
        res.json(value.data);
        res.statusCode = 200;
    })
})

router.get('/myUnspentTransactionOutputs', (req, res) => {
    axios.get('http://localhost:3001/myUnspentTransactionOutputs').then(value => {
        res.json(value.data);
        res.statusCode = 200;
    })
})



router.get('/mineBlock', function mineBlockChain() {
    setInterval(mineBlock, 5000);
})

function mineBlock() {
    axios.get('http://localhost:3001/transactionPool').then(respone => {
        if (respone.data.length > 0) {
            axios.post('http://localhost:3001/mineBlock', null, null);
        }
    })
}

var checkChangeTransaction = function () {
    return new Promise((resolve, reject) => {
        axiosInstance.get('/address/' + PUBLIC_KEY)
            .then(function (res) {
                return res.data;
            })
            .then(value => resolve(value))
            .catch(err => {
                err => reject(err)
            });
    })
}

router.get('/checkTransactionReceive', function checkTransactionReceive() {
    setInterval(receiveTran, 5000);
})

function receiveTran() {
    checkChangeTransaction().then(value => {
        if (value.unspentTxOuts.length > LENGTH_TRANSACTION) {
            let i = LENGTH_TRANSACTION;
            let lengthTran = value.unspentTxOuts.length;
            let unspentTxOuts = value.unspentTxOuts;
            LENGTH_TRANSACTION = lengthTran;
            console.log(LENGTH_TRANSACTION);
            for (i = i; i < lengthTran; i++) {
                let object = unspentTxOuts[i];
                console.log(object);
                if (object.accountFrom.id != undefined && object.accountFrom.id != null) {
                    excuteTransaction(object.amount, object.accountFrom, object.accountTo)
                } else console.log('underfine');
            }
        }
    }).catch(err => {
        console.log(err);
    })
}

module.exports = router;