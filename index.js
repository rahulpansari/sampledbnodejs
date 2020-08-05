var express = require('express');
var bodyParser = require('body-parser');
const pool = require('./mysqlconfig');
var signup=require('./signup');
var login=require('./login');
var login=require('./delete');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.post('/signup', urlencodedParser,signup)
app.get('/login',login)
app.delete('/delete',login)
var server = app.listen(80, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })