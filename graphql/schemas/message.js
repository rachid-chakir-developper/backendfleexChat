const { gql } = require('apollo-server-express');

module.exports = gql`

 type Message {
     id: Int!
     content: String!
     user: User
     chat: Chat
     createdAt: String
     chatId: Int!
     userId: Int!
 }

extend type Query {
    messages(idChat: Int!): [Message!]
    message(id: Int!): Message
}

 extend type Mutation {
     createMessage(content: String!, idChat: Int!): CreateMessageResponse
 }

 type CreateMessageResponse {
    id: Int!
    content: String!
    createdAt: String!
 }

`;