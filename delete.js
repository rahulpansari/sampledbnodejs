const pool = require('./mysqlconfig');
var query_result = function (req, res) {
   pool.getConnection(function (err, con) {
      var phoneno = req.query.mobile;
      var email = req.query.email;
      var sql;
      if (phoneno != null && phoneno.length != 10)
         res.send({ "status": 0, "message": "Invalid Mobile Number" });
      if (email != null)
         sql = "Delete from Users where email='" + email + "'";
      else if (phoneno != null)
         sql = "Delete from Users where mobile='" + phoneno + "'";
      if (sql != null) {
         con.query(sql, function (err, result) {
            if (err) throw err;
        
            var aff_records = result['affectedRows'];

            if (aff_records == 0) {
               res.send({ "status": 0, "message": "Record Not Exist" });

            }
            else
            {res.send({ "status": 1, "message":"Delete Succesfull" });}
con.release();
         });
      }
      else {
         res.status(400).send();
      }

   });
}
module.exports = query_result;