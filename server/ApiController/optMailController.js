'use strict';
const nodemailer = require('nodemailer');
var otplib = require('otplib');
var express = require('express');
var router = express.Router();
otplib.authenticator.options = {
    step: 300,
    window: 0
  };
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
router.post('/sendOtpMail', (req, res) => {
    const secret = req.body.userName;
    const token = otplib.authenticator.generate(secret);
    nodemailer.createTestAccount((err, body) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vinhhoangcom2us@gmail.com',
                pass: 'VINHhoang51' // generated ethereal password
            }
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"MyEBank" <vinhhoangcom2us@gmail.com>', // sender address
            to: res.body.email, // list of receivers
            subject: 'OTP Confirm', // Subject line
            html: '<b>Dear ' + req.body.userName + '</b> <br/> <a>This is your OTP code </a> <b>' + token + '</b> <br/>' +
                '<a>This code will expire in 5 minute !</a> <br/>' +
                '<a>This code is for your MyEBank transaction confirmation</a>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            else{
                res.statusCode = 200;
                res.end('Done');
            }
        });
    });
})

router.post('/checkOtp',(req,res)=>{
    const secret= req.body.userName;
    var isValid = otplib.authenticator.check(req.body.token, secret);
    if(isValid){
        res.statusCode = 200;
        res.end('Confirmed');
    }
    else{
        res.statusCode = 403;
        res.end('Wrong OTP code');
    }
})

module.exports = router;