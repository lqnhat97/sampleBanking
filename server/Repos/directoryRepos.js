var db= require('../DB/db');

exports.getAllDirectories = ()=> {
    var sql = `select * from directory;`;
    return db.load(sql);
}

exports.getDirectoriesById = (param)=> {
    var sql = `select * from directory where idRootUser= ${param};`;
    return db.load(sql);
}

exports.insertDirectory = (body) =>{
    var sql = `insert into directory(idRootUser,idBank,stkElementUser,elementUserName) values('${body.idRootUser}','${body.idBank}','${body.stkElementUser}','${body.elementUserName}'); `
    return db.insert(sql);
}

exports.updateDirectory = (body) =>{
    var sql = `update directory set elementUserName = '${body.elementUserName}' where idRootUser='${body.idRootUser}'and stkElementUser='${body.stkElementUser}';`
    return db.update(sql);
}

exports.deleteDirectory = (body) =>{
    var sql = `delete from directory where stkElementUser = '${body.stkElementUser}' and idRootUser='${body.idRootUser}';`
    return db.update(sql);
}