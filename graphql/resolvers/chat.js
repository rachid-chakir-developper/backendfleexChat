const { Chat } = require('../../models');
const { User } = require('../../models');

const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  Mutation: {
    async createChat(_, { }, { user = null }) {
      if (!user) {
        throw new AuthenticationError('You must login to create a chat');
      }
      const chat = await Chat.create();
      if(chat){
        await chat.addUser(user);
        const users = await chat.getUsers();
        return { ...chat.toJSON(), users };
      }
      throw new ApolloError('Unable to create a chat');
    },
    async addUserToChat(_, { idChat, idUser }, { user = null }) {
        if (!user) {
          throw new AuthenticationError('You must login to create a chat');
        }
        
        const chat = idChat ? await Chat.findByPk(idChat) : await await Chat.create();
        const userToAdd = await User.findByPk(idUser);
        if(chat){
            await chat.addUser(userToAdd);
            if(!idChat) chat.addUser(user);
            const users = await chat.getUsers();
            return { ...chat.toJSON(), users };
        }
        throw new ApolloError('Unable to create a chat');
        }
  },

  Query: {
    async chats(root, args, { user = null }) {
      return user.getChats();
    },
    async chat(_, { id }, { user = null }) {
      return Chat.findByPk(id);
    },
  },

  Chat: {
    users(chat) {
      return chat.getUsers();
    },

    messages(chat) {
      return chat.getMessages();
    },
  },
};