import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    axios.post('http://localhost:3000/createPost', formData)
    .then(res => {
      if (res.data === 'Success') {
        window.location.href = '/';
      } 
    })
    .catch(err => console.log(err))
  }

  return (
    <Container>
      <Form className="rounded border-rounded border-info w-50 p-3 bg-dark text-info" style={{ margin: "150px auto" }}>
        <h2 className='text-center'>Create a Post</h2>
        <Form.Group>
          <Form.Control type='text' placeholder='Enter title' onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Control as={'textarea'}  placeholder='Enter description' onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Control type='file' placeholder='Choose file' onChange={(e) => setFile(e.target.files[0])}/>
        </Form.Group>
        <br/>
        <Row className="d-flex justify-content-center p-3">
          <Button variant='info' onClick={handleSubmit}>Post</Button>
        </Row>
      </Form>
    </Container>
  );
}

export default CreatePost;
