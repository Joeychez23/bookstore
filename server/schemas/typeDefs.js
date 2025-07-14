const { gql } = require('apollo-server-express');
//        link: String
const typeDefs = gql`
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        title: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    input BookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        title: String

    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addBook(book: BookInput): User
        removeBook(bookId: String!): User
    }
`;


module.exports = typeDefs;