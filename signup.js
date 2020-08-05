const pool = require('./mysqlconfig');
var query_result = function (req, res) {
   pool.getConnection(function (err, con) {
      var sql;
      var name = req.body.name;
      var phoneno = req.body.mobile;
      var email = req.body.email;
      var dob=req.body.dob;
      var createddate=req.body.cdate;
      var modifieddate=req.body.modifieddate;
      var password = req.body.password;
      if (phoneno != null && phoneno.length != 10)
         res.send({ "status": 0, "message": "Invalid Mobile Number" });
      if (phoneno != null && email != null)
         sql = "Select count(*) as records from Users where mobile ='" + phoneno + "' or email='" + email + "'";
      else if (phoneno != null)
         sql = "Select count(*) as records from Users where mobile ='" + phoneno + "'";
      else if (email != null)
         sql = "Select count(*) as records from Users where email='" + email + "'";
      if (sql != null) {
         con.query(sql, function (err, result) {
            if (err) throw err;
            var no_records = result[0]["records"];
            if (no_records > 0) {
               res.send({ "status": 0, "message": "Record Already Exist Please SignIn" });
            }
            else {
               var sql_insert;
               if (phoneno != null && email != null)
                  sql_insert = "INSERT into Users (name,email,mobile,password,dob,createdat,modifiedat) Values ('" + name + "','" + email + "','" + phoneno + "','" + password + "','"+dob+"','"+createddate+"','"+modifieddate+"')";
               else if (phoneno != null) {
                  sql_insert = "INSERT into Users (name,mobile,password,dob,createdat,modifiedat) Values ('" + name + "','" + phoneno + "','" + password + "','"+dob+"','"+createddate+"','"+modifieddate+"')";

               }
               else if (email != null) {
                  sql_insert = "INSERT into Users (name,email,password,dob,createdat,modifiedat) Values ('" + name + "','" + email  + "','" + password + "','"+dob+"','"+createddate+"','"+modifieddate+"')";

               }
               con.query(sql_insert, function (err, result) {
                  if (err) throw err;
                  res.send({"status":"1","message:":"Successfully Registered"});
               });
            }
            con.release();
         });
      }
      else {
         res.status(400).send;
      }

   });
}
module.exports = query_result;