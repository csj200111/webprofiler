// models/DataModel.js
const { DataTypes, Model } = require('sequelize');

class DataModel extends Model {
  static initModel(sequelize, tableName) {
    return DataModel.init(
      {
        core: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        task: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        usaged: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'DataModel',
        tableName,
        timestamps: false,
      }
    );
  }
}

module.exports = DataModel;
