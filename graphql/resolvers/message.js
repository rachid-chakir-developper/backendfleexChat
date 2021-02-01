const { Message } = require('../../models');
const { Chat } = require('../../models');

const { AuthenticationError, withFilter } = require('apollo-server-express');

module.exports = {
  Mutation: {
    async createMessage(_, { content, idChat}, { user = null, pubsub  }) {
      if (!user) {
        throw new AuthenticationError('You must login to send a message');
      }
      const message = await Message.create({
        userId: user.id,
        chatId: idChat,
        content,
      });
      pubsub.publish('NEW_MESSAGE', { newMessage: message })
      return message
    },
  },

  Query: {
    async messages(root, {idChat}, context) {
        const chat = await Chat.findByPk(idChat);
        return chat.getMessages();
    },
    async message(_, { id }, context) {
      return Message.findByPk(id);
    },
  },

  Message: {
    user(message) {
      return message.getUser();
    },

    chat(message) {
      return message.getChat();
    },
  },
  Subscription: {
    newMessage: {
      subscribe:  withFilter(
        (_, __, { pubsub, user }) => {
          if (!user) throw new AuthenticationError('Unauthenticated')
          return pubsub.asyncIterator('NEW_MESSAGE')
        },
        async ({ newMessage }, _, { user }) => {
          const userChats =  await user.getChats();
          const userChatsIds = userChats.map((c)=> c.id )
          if (
            newMessage.userId === user.id ||
            userChatsIds.indexOf(newMessage.chatId) > 0
          ) {
            return true
          }

          return false
        }
      ),
    },
  }
};