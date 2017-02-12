const pgpromise = require('pg-promise')();
const pgconfig = {
    host: 'localhost',
    port: 5432,
    database: 'hamster',
    user: 'postgres',
    password: 'squirrel'
};
const db = pgpromise(pgconfig);

module.exports = db;
