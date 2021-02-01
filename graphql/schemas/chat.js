const { gql } = require('apollo-server-express');

module.exports = gql`

 type Chat {
     id: Int!
     users: [User!]
     messages: [Message!]
 }

 extend type Mutation {
     createChat: CreateChatResponse
     addUserToChat(idChat: Int! ,idUser: Int!): addUserToChatResponse
 }
 extend type Query {
    chats: [Chat!]
    chat(id: Int!): Chat
}
 type CreateChatResponse {
    id: Int!
    users: [User!]
    messages: [Message!]
 }
type addUserToChatResponse{
    id: Int!
    users: [User!]
    messages: [Message!]
 }
 type Subscription {
    newMessage: Message!
  }
`;