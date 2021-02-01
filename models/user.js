'use strict';

const bcrypt = require('bcrypt');


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Message, { foreignKey: 'userId', as: 'messages' })
      this.belongsToMany(models.Chat, {
        through: "chat_user",
        as: "chats",
        foreignKey: "chatId",
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isOnline: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash();
  });
  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hash(this.password, 10);
    }
  };
  
  return User;
};