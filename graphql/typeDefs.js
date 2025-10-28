const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String
    publishedYear: Int
  }

  type Query {
    getBooks: [Book]
    getBook(id: ID!): Book
  }

  input BookInput {
    title: String!
    author: String
    publishedYear: Int
  }

  type Mutation {
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
    deleteBook(id: ID!): String
  }
`;

module.exports = typeDefs;