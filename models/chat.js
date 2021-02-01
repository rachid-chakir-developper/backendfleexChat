'use strict';




const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Message, { foreignKey: 'chatId', as: 'messages' })
      this.belongsToMany(models.User, {
        through: "chat_user",
        as: "users",
        foreignKey: "userId",
      });
    }
  };
  Chat.init({
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};