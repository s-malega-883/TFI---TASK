const mysql = require('mysql2');

const config = require('../config/config.json');

const pool = mysql.createPool({ 
    //Connection pool-we can constantly listen to the requests from mysql and node
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});

module.exports = pool.promise();