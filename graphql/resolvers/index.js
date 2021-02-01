const userResolvers = require('./user');
const messageResolvers = require('./message');
const chatResolvers = require('./chat');

module.exports = [userResolvers,messageResolvers,chatResolvers];