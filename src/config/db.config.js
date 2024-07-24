const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(process.cwd(), `config.${process.env.NODE_ENV}.env`),
});

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_DATABASE } = process.env;

module.exports = {
  HOST: DB_HOST,
  USER: DB_USER,
  PORT: DB_PORT,
  PASSWORD: DB_PASSWORD,
  DB: DB_DATABASE,
  dialectOptions: {
    // ssl: {
    //   require: false,
    //   rejectFORBIDDEN: false,
    // },
  },
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
