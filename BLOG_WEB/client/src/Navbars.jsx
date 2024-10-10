import { useContext } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { userContext } from './App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbars = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get('http://localhost:3000/logout')
    .then(res => {
      if (res.data === 'Success') {
        navigate(0);
      }
    }).catch(err => console.log(err))
  }

  

  return (
    <Navbar bg="dark" className="border border-info" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="text-info">Blog-Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border border-info" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-info">Home</Nav.Link>
            {
              user.username ?
              <Nav>
                <Nav.Link href='/createPost' className='text-info'>Create Post</Nav.Link>
                <Nav.Link className='text-info' onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
              :
              <Nav>
                <Nav.Link href="/register" className="text-info">Register</Nav.Link>
                <Nav.Link href="/login" className="text-info">Login</Nav.Link>
              </Nav>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
