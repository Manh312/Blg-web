import { Alert, Button, Container, Form, Row } from "react-bootstrap";
import axios from 'axios';
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === '' || email === '' || password === '') {
      setError('Please fill in both email, password and username fields.');
      return;
    }
    axios.post('http://localhost:3000/register', {
      username,
      email,
      password
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <Container>
      <Form
        className="rounded border-rounded border-info w-50 p-3 bg-dark text-info"
        style={{ margin: "150px auto" }}
      >
        <h2 className="text-center">Sign up</h2>
        {error && <Alert variant="info">{error}</Alert>}
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Row className="d-flex justify-content-center p-3">
          <Button variant="primary" onClick={handleSubmit}>Sign up</Button>
        </Row>
        <p>
          Already have an account?
          <Row className="d-flex justify-content-center p-3">
            <Button variant="info" href="/login">Login</Button>
          </Row>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
