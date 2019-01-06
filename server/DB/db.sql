
/*drop database myebank;*/
CREATE DATABASE `myebank` /*!40100 DEFAULT CHARACTER SET latin1 */;
Use myebank;

CREATE TABLE `account` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT null,
  `passwords` varchar(45) NOT null,
  `email` varchar(45) NOT NULL,
  `cnmd` int(9) NOT NULL,
  `dienthoai` int(10) NOT NULL,
  `isActive` boolean,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `payment_account`(
	`soTaiKhoan` varchar(16) NOT NULL,
    `soDu` int(11) NOT NULL,
    `idUser` int(11) NOT NULL,
    `status` boolean default true,
     PRIMARY KEY (`soTaiKhoan`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `bank` (
  `idBank` int(11) not NULL,/*lien ngan hang thi luu null*/
  `name` varchar(16) NOT NULL,
  `address` varchar(500) NOT NULL,
  `domain` varchar(255) NOT NULL,
  PRIMARY KEY (`idBank`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `directory` (
  `idRootUser` int(11) NOT NULL,
  `idBank` int(11) DEFAULT NULL,/*lien ngan hang thi luu null*/
  `stkElementUser` varchar(16) NOT NULL,
  `elementUserName` varchar(45) NOT NULL,
  PRIMARY KEY (`idRootUser`,`stkElementUser`),
  FOREIGN KEY ( `idRootUser`) REFERENCES account( `idUser`),
  FOREIGN KEY ( `stkElementUser`) REFERENCES payment_account( `soTaiKhoan`),
  foreign key(`idBank`) references bank(`idBank`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `history` (
  `idHistory` int(11) NOT NULL AUTO_INCREMENT,
  `stkSenter` varchar(16) NOT NULL,
  `idBank` int(11) DEFAULT NULL,/*lien ngan hang thi luu null*/
  `stkReceiver` varchar(45) DEFAULT NULL,
  `tradingTime` datetime NOT NULL,
  `amount` int(11) NOT NULL,
  `transactionFee` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `typeFee` int(11) Not NULL ,/*0 người nhận trả phí, 1  người gửi trả phí*/
  PRIMARY KEY (`idHistory`),
  FOREIGN KEY ( `stkSenter`) REFERENCES payment_account( `soTaiKhoan`),
  FOREIGN KEY ( `stkReceiver`) REFERENCES payment_account( `soTaiKhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `employees` (
  `idEmployees` int(11) NOT NULL AUTO_INCREMENT,
  `typeEmployees` int(11) NOT NULL,/*1: Normal, 2: Manager*/ 
  `userName` varchar(20) NOT NULL UNIQUE,
  `passwords` varchar(20) NOT NULL,
  PRIMARY KEY (`idEmployees`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 
create table `token`(
	`idEmployees` int(11) NOT NULL,
    `typeEmployees` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  PRIMARY KEY (`idEmployees`),
   FOREIGN KEY ( `idEmployees`) REFERENCES employees( `idEmployees`)
 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

create table `user_token`(
	`idUser` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`),
   FOREIGN KEY ( `idUser`) REFERENCES account( `idUser`)
  
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into account(userName,passwords,email,cnmd,dienthoai,isActive) values ('nhatlq','123456','lqn@gmail.com','0123456789','0784094564',true);
insert into account(userName,passwords,email,cnmd,dienthoai,isActive) values ('longch','123456','lqn@gmail.com','0123456789','0784094564',true);
insert into account(userName,passwords,email,cnmd,dienthoai,isActive) values ('vinhhnq','123456','lqn@gmail.com','0123456789','0784094564',true);

insert into employees(userName,passwords,typeEmployees) values ('nhatlq','123456',1);
insert into employees(userName,passwords,typeEmployees) values ('longch','123456',2);
insert into employees(userName,passwords,typeEmployees) values ('vinhhnq','123456',1);


insert into payment_account(soTaiKhoan,soDu,idUser) values ('3211313322131','1000000',1);
insert into payment_account(soTaiKhoan,soDu,idUser) values ('5465465464664','1000000',2);
insert into payment_account(soTaiKhoan,soDu,idUser) values ('7897987979798','1000000',3);

insert into bank values (999,'PPNBank','045de212ef435d95088f430ab5c8bbf16967121bd7384b5393b09377ddf689194de456edae1993753c7f5cce76c1d5d54f75c61b4796bebcc8236aaf7b97593654','');
insert into bank values (888,'BankN','042d14e0fb73f3733448967618107fac7ba9bb58094fa2879fca8d918d196a821c22624bbf6c2299b226f7ebdad867c600c7b2e6e35ee79636a9440a4d112ff8f5','');
insert into bank values (777,'MyEBank','04d7479d0bd963294e302f721f2c76f88ece0da3c378e38f9e5e9a42d5fb56d1f3a457c74dae25b2b35247a5c1a0b3d12eb48e61f87354753b80bcc91c9fc5401f','');
update bank set name = 'PPNBank', address = '045de212ef435d95088f430ab5c8bbf16967121bd7384b5393b09377ddf689194de456edae1993753c7f5cce76c1d5d54f75c61b4796bebcc8236aaf7b97593654' where idBank = 999;
update account set email = 'vinhhoang51@gmail.com' where idUser = 3;
select * from payment_account;	
select * from token;
select * from user_token;
select * from account;
select * from payment_account where soTaiKhoan = '5465465464664';
select * from payment_account where soTaiKhoan = '3211313322131';
select * from payment_account where soTaiKhoan = '5465465464664';

select * from bank;

select * from history;
select * from account;
select * from directory;
/*insert into account(userName,passwords,email,cnmd,dienthoai,isActive) values ('nhatlq','123456','lqn@gmail.com','0123456789','0784094564',true);
insert into account(userName,passwords,email,cnmd,dienthoai,isActive) values ('longch','123456','lqn@gmail.com','0123456789','0784094564',true);
insert into account(userName,passwords,email,cnmd,dienthoai,isActive) values ('vinhhnq','123456','lqn@gmail.com','0123456789','0784094564',true);*/