var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    path = require('path'),
    verifyAccessToken = require('./Repos/authRepos').verifyAccessToken,
    authRepos= require('./Repos/authRepos'),
    userController = require ('./ApiController/userController'),
    directoryController = require('./ApiController/directoryController'),
    accountController = require('./ApiController/accountController'),
    historyController = require('./ApiController/historyController'),
    transferController = require('./ApiController/transferController'),
    paymentAccountController = require('./ApiController/paymentAccountController'),
    otpMailController = require ('./ApiController/optMailController');
    blockchainController = require('./ApiController/blockchainController');

var app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
var staticDir = express.static(
    path.resolve(__dirname, 'public')
);
app.use(staticDir);

app.use('/api/user',userController);
app.use('/api/directory',verifyAccessToken,directoryController);
app.use('/api/account',verifyAccessToken,accountController);
app.use('/api/history',verifyAccessToken,historyController );
app.use('/api/transfer',verifyAccessToken ,transferController);
app.use('/api/paymentAccount',verifyAccessToken,paymentAccountController);
app.use('/api/otpmail' ,verifyAccessToken ,otpMailController);
app.use('/api/blockchain',verifyAccessToken,blockchainController);

const port = process.env.PORT || 8088;
app.listen(port,'0.0.0.0', () => {
    console.log(`API running on port ${port}`);
});