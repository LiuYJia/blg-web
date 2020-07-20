var mysql = require('mysql')

var pool  = mysql.createPool({
});

module.exports = pool