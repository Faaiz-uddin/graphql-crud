const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    publishedYear: Int
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getAuthors: [Author]
    getAuthor(id: ID!): Author
    getBooks: [Book]
    getBook(id: ID!): Book
    me: User
  }

  input AuthorInput {
    name: String!
    age: Int
  }

  input BookInput {
    title: String!
    authorId: ID!
    publishedYear: Int
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload
    login(input: LoginInput!): AuthPayload

    createAuthor(input: AuthorInput!): Author
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
    deleteBook(id: ID!): String
  }
`;

module.exports = typeDefs;