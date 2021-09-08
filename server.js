require('dotenv').config()

var mysql = require('mysql');
const express = require('express')
const bodyparser = require('body-parser')
const app = express()

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});
app.listen(8080, ()=> console.log("Server running"))
connection.end();   