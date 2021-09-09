const mysql = require('mysql');

var connection;

connection = mysql.createConnection({
    host     : 'database-1.cucmlkcnfypn.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'meenamegh',
    port     : '3306',
    database : 'Uber'
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });


  module.exports = connection;
