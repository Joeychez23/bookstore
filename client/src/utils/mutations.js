import { gql } from "@apollo/client";

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
      }
    }
  }
`;


export const ADD_BOOK = gql`
  mutation addBook($book: BookInput!) {
    addBook(book: $book) {
      username
      email
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        title
      }
    }
  }`;


  export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


