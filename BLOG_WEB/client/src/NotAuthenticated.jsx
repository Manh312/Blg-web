import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

const NotAuthenticated = () => {
  return (
    <Container className="mt-5">
      <Alert variant="info" className="text-center" style={{marginTop: '100px'}}>
        <h1>Error 401 - Not Authenticated</h1>
        <p>You need to be logged in to access this page.</p>
        <Button variant="primary" href="/login">
          Go to Login
        </Button>
      </Alert>
    </Container>
  );
}

export default NotAuthenticated;
