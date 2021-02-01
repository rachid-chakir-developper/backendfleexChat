'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      this.belongsTo(models.Chat, { foreignKey: 'chatId', as: 'chat' })
    }
  };
  Message.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};