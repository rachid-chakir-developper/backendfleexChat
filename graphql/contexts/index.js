const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express')

const { PubSub } = require('apollo-server-express')

const pubsub = new PubSub()

const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, 'mySecret');
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req, connection }) => {
  let token
  if (req && req.headers.authorization) {
    token = req.headers.authorization.split('Bearer ')[1]
  } else if (connection && connection.context.Authorization) {
    token = connection.context.Authorization.split('Bearer ')[1]
  }
   const user = await verifyToken(token)
  return { user, pubsub };
};