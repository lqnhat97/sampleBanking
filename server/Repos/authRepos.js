var jwt = require('jsonwebtoken');
var rndToken=require('rand-token');
var moment= require('moment');
var db = require ('../DB/db');

const SECRET = 'NHATLONGVINH';
const AC_LIFETIME = 10000;

exports.generateAccessToken = userEntity =>{
    var payload ={
        user: userEntity,
        info: 'info'
    };
    
    var token = jwt.sign(payload, SECRET, {
        expiresIn:AC_LIFETIME
    });

    return token;
}

exports.verifyAccessToken = (req,res,next)=>{
    var token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token,SECRET,(err, payload)=>{
            if(err){
                res.statusCode = 401;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next();
            }
        })
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN'
        })
    }
}

exports.generateRefreshToken = () => {
    const SIZE = 80;
    return rndToken.generate(SIZE);
}

exports.insertRefreshToken = (idEmployees, typeEmployees, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = `delete from token where idEmployees = '${idEmployees}'`;
        db.insert(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into token values(${idEmployees}, '${typeEmployees}','${rdt}', '${rfToken}' )`;
                return db.insert(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.insertAccountRefreshToken = (idUser, rfToken) => {
    return new Promise((resolve, reject) => {
        var sql = `delete from user_token where idUser = '${idUser}'`;
        db.insert(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into user_token values(${idUser}, '${rdt}','${rfToken}' )`;
                return db.insert(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.reCheckToken = (body) =>{
    return new Promise((resolve, reject) => {
        var sql = `select refreshToken from token where idEmployees = '${body.id}'`;
        db.load(sql)
            .then(value => {
                console.log(value[0].refreshToken);
                console.log(body.refresh_token);
                if(value[0].refreshToken == body.refresh_token){
                    return body.userEntity;
                }
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });  
}

exports.reCheckAccountToken = (body) =>{
    return new Promise((resolve, reject) => {
        var sql = `select refreshToken from user_token where idUser = '${body.id}'`;
        db.load(sql)
            .then(value => {
                if(value[0].refreshToken == body.refresh_token){
                    return body.userEntity;
                }
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });  
}


