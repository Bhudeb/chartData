var mysql = require('mysql2');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'stockdb'
  });
  
  // simple query
  connection.query(
    'SELECT * FROM `chart`',
    function(err, results, fields) {
      console.log(err)  
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );