const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    currentUser: User
  }

  # Student object
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  # Mutation
  type Mutation {
    create(input: CreateUserInput!): User!
    loginUser(input: LoginUserInput!): AuthPayload!
  }

  enum TypeCollection {
    WantDoRead
    Reading
    Read
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    date: String!
    image: String
    type: String!
  }
  
  input CreateBookInput {
    title: String!
    author: String!
    date: String!
    type: String!
  }
  
  type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, type: String!): Book!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book!
  }
`;

module.exports = { typeDefs };