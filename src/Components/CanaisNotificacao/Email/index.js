// SendEmail.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmail = () => {
    // Aqui você deve adicionar a lógica para enviar o e-mail
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Body:', body);
  };

  return (
    <Container className="mt-5">
      <h2>Send Email</h2>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter recipient email"
          />
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
          />
        </Form.Group>

        <Form.Group controlId="formBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email body"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSendEmail}>
          Send Email
        </Button>
      </Form>
    </Container>
  );
};

export default SendEmail;
