var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:"node_result_management_assignmet",
 
});
 module.exports = con;