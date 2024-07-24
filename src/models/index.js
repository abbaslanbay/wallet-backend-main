const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const definitions = require('./definitions');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  ssl: true,
  dialectOptions: dbConfig.dialectOptions,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});

const db = definitions(sequelize, Sequelize);

module.exports = db;
