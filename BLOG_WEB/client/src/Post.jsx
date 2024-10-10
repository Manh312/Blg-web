import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios.get('http://localhost:3000/getPostById/' + id)
      .then(result => setPost(result.data))
      .catch(err => console.log(err))
  }, [id]);

  return (
    <Container>
      <Row className='mt-5 d-flex justify-content-center'>
        <Card style={{ width: '70%' }} >
          <Card.Img variant='top' src={`http://localhost:3000/images/${post.file}`} />
          <Card.Body className='text-center'>
            <h2>{post.title}</h2>
          </Card.Body>
          <Card>{post.description}</Card>
        </Card>
      </Row>
    </Container>
  );
}

export default Post;
