var db= require('../DB/db');

exports.getAllDirectories = ()=> {
    var sql = `select * from directory;`;
    return db.load(sql);
}

exports.insertDirectory = (body) =>{
    var sql = `insert into directory(idRootUser,idBank,stkElementUser,elementUserName) values('${body.idRootUser}','${body.idBank}','${body.stkElementUser}','${body.elementUserName}'); `
    return db.insert(sql);
}

exports.updateDirectory = (body) =>{
    var sql = `update directory set elementUserName = '${body.elementUserName}' where idRootUser='${body.idRootUser}';`
    return db.update(sql);
}