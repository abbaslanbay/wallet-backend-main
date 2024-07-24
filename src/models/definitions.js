const User = require('./user/user.model');
const UserLog = require('./user/userLog.model');
const Token = require('./user/token.model');
const Files = require('./files.model');

const definitions = (sequelize, Sequelize) => {
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.User = User(sequelize);
  db.Token = Token(sequelize);
  db.Files = Files(sequelize);
  db.UserLog = UserLog(sequelize);
  return db;
};

module.exports = definitions;
