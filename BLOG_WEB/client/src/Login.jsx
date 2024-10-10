import { useState } from "react";
import { Alert, Button, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [succes, setSuccess] = useState('');
  const navigate = useNavigate();


  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setError('Please fill in both email and password fields.');
      return;
    }
    if (!email.includes('@') ) {
      setError('Please enter a valid email address.');
      return;
    }
    axios.post('http://localhost:3000/login', {
      email,
      password
    })
    .then(res => {
      if (res.data === 'Success') {
        setError('');
        setSuccess('Login successful');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else if (res.data === 'User not exist') {
        navigate('/notAuthenticated');
      } 
    })
    .catch(err => console.log(err))
  }

  return (
    <Container>
      <Form
        className="rounded border-rounded border-info w-50 p-3 bg-dark text-info"
        style={{ margin: "150px auto" }}
      >
        <h2 className="text-center">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {succes && <Alert variant="success">{succes}</Alert>}
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Row className="d-flex justify-content-center p-3">
          <Button variant="primary" onClick={handleSubmit}>Login</Button>
        </Row>
        <p>
          Not registered?
          <Row className="d-flex justify-content-center p-3">
            <Button variant="info" href="/register">Sign up</Button>
          </Row>
        </p>
      </Form>
    </Container>
  );
}

export default Login;
