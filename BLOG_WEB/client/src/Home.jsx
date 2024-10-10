import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/getPosts')
      .then(posts => {
        setPosts(posts.data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        {posts.map(post => (
          <Col md={4} sm={6} xs={12} key={post._id} className="d-flex align-items-stretch">
            <Link to={'/post/' + post._id} style={{ textDecoration: 'none' }}>
              <Card style={{ width: '80%' }} className="m-3" bg="info">
                <Card.Img variant="top" src={`http://localhost:3000/images/${post.file}`} style={{ height: '240px' }} />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                </Card.Body>
              </Card>
              </Link>
          </Col>
        ))}
    </Row>
    </Container >
)}
export default Home;
