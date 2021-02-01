const { gql } = require('apollo-server-express');
const userType = require('./user')
const messageType = require('./message')
const chatType = require('./chat')

const rootType = gql`
 type Query {
     root: String
     users : [User]
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, userType, messageType, chatType];