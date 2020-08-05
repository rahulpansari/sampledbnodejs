const pool = require('./mysqlconfig');
var query_result = function (req, res) {
   pool.getConnection(function (err, con) {
      var phoneno = req.query.mobile;
      var email = req.query.email;
      var sql;
    
      var password = req.query.password;
      if (phoneno != null && phoneno.length != 10)
         res.send({ "status": 0, "message": "Invalid Mobile Number" });
      if (email != null)
         sql = "Select * from Users where email='" + email + "'";
      else if (phoneno != null)
         sql = "Select * from Users where mobile='" + phoneno + "'";
      if (sql != null) {
         con.query(sql, function (err, result) {
            if (err) throw err;
            var no_records = result.length;

            if (no_records == 0) {
               res.send({ "status": 0, "message": "Record Not Exist Please Sign In" });

            }
            else {
               if (result[0]["password"].trim() === password) {
                  
                     res.send({ "status": 1, "message": "Login Successfull ", "records": result });
                  
               }
               else {
                  res.send({ "status": 0, "message": "Invalid Password" });

               }
               


            }
con.release();
         });
      }
      else {
         res.status(400).send();
      }

   });
}
module.exports = query_result;