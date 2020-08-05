var mysql = require('mysql');

var pool       = mysql.createPool({
  
  host            : 'localhost',
  user            : 'root',
  password        : '< root >',
  database        : 'Assignment'
});
module.exports=pool;