const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserLog = sequelize.define(
    'UserLog',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM(
          'registered',
          'loginWithEmail',
          'verifyAccountByPhone',
          'verifyAccountByEmail',
          'loginWithPhone',
          'logout',
          'getUser',
          'updateUser',
          'updateNotifySettings',
          'password_change',
          'resetPasswordByEmail',
          'resetPasswordByPhone',
          'changePasswordByReset',
          'changePassword',
          'email_verification',
          'sms_verification',
          'kyc_verification',
          'kyc_verification_success',
          'kyc_verification_fail',
          'buy_token',
          'sell_token',
          'withdraw_token',
          'withdraw_cash',
          'deposit_cash'
        ),

        allowNull: false,
      },
    },
    {
      tableName: 'user_logs',
      timestamps: true,
      indexes: [
        {
          name: 'user_logs_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  return UserLog;
};
