const { UserLog } = require('../../models');

const addLog = async (user_id, type) => {
  const userLog = await UserLog.create({
    user_id,
    type,
  });
  return userLog;
};

module.exports = {
  addLog,
};
