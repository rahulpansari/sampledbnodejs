# sampledbnodejs

db command ->create database Assignment;
use Assignment;
create table Users(id int primary key auto_increment,name varchar(28) not null,email varchar(30) unique key,mobile char(10) unique key,password varchar(20) not null,dob date,createdat date,modifiedat date);
