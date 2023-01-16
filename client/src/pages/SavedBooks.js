import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
//import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {

  const { loading, data } = useQuery(QUERY_ME)

  const [rmBook] = useMutation(REMOVE_BOOK);

  let userData;

  if (data ? true : false) {
    userData = data?.me || {};
  }


  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }



  const handleDeleteBook = async (bookId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await rmBook({
        variables: { bookId: bookId },
        update: cache => {
          const {me} = cache.readQuery({ query: QUERY_ME });
          const userDataCache = me;
          const savedBooksCache = userDataCache.savedBooks;
          const updatedBookCache = savedBooksCache.filter((book) => book.bookId !== bookId);
          cache.writeQuery({ query: QUERY_ME , data: { me: { ...me, savedBooks: [...updatedBookCache] } } })
        }
      })
      removeBookId(bookId)
    }

    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;

/*                 <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
Delete this Book!
</Button>*/