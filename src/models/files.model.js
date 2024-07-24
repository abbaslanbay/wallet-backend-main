const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const File = sequelize.define(
    'File',
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
        references: {
          model: 'users',
          key: 'id',
        },
      },

      original_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimetype: {
        type: DataTypes.STRING,
      },
      size: {
        type: DataTypes.INTEGER,
      },
      storage_class: {
        type: DataTypes.STRING,
      },
      etag: {
        type: DataTypes.STRING,
      },
      version_id: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'files',
      timestamps: true,
      indexes: [
        {
          name: 'files_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  return File;
};
