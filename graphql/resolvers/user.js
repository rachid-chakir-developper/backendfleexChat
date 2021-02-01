const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');
const Op = require('sequelize').Op;
const { User } = require('../../models');

module.exports = {
  Mutation: {
    async register(root, args, context) {
      const { name, email, password } = args.input;
      return User.create({ name, email, password });
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        await user.update({
          isOnline: true
        })
        const token = jwt.sign({ id: user.id }, 'mySecret');
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError('Invalid credentials');
    },
  },
  Query: {
    async users(root, args, { user = null }) {
      return User.findAll({where: {id: { [Op.ne]: user.id }}});
    }
    // ,
    // async chat(_, { id }, context) {
    //   return Chat.findByPk(id);
    // },
  },
};