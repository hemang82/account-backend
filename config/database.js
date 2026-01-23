const Mysql = require('mysql2');

var con = {
    host: process.env.MODE === "PRODUCTION" ? process.env.LIVE_DATABASE_HOST : process.env.DEV_DATABASE_HOST,
    user: process.env.MODE === "PRODUCTION" ? process.env.LIVE_DATABASE_USER : process.env.DEV_DATABASE_USER,
    password: process.env.MODE === "PRODUCTION" ? process.env.LIVE_DATABASE_PASS : process.env.DEV_DATABASE_PASSWORD,
    database: process.env.MODE === "PRODUCTION" ? process.env.LIVE_DATABASE_NAME : process.env.DEV_DATABASE_NAME
}

console.log('process.env.DATABASE_HOST', process.env.DATABASE_HOST);

var connection = Mysql.createPool(con);
connection.getConnection((error, conn) => {
    if (error) {
        console.log('Cant connect to database, Check youre database connection');
    } else {
        console.log('Database connected');
    }
});

module.exports = connection;