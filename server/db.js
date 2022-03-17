const Pool = require('pg').Pool;

//enabling the env file working
require('dotenv').config()

//Creating new instance of pool
const pool = new Pool ({
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database : "crypto", 
    host: process.env.DB_HOST, 
    port: 5432
})


module.exports = pool;