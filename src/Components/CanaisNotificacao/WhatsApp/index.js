// SendMessageWhatsApp.js
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SendMessageWhatsApp = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSendMessage = () => {
    // Aqui você deve adicionar a lógica para enviar a mensagem e o arquivo via WhatsApp
    console.log('Message:', message);
    console.log('File:', file);
  };

  return (
    <Container className="mt-5">
      <h2>Send Message via WhatsApp</h2>
      <Form>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
        </Form.Group>

        <Form.Group controlId="formFile">
          <Form.Label>Attach File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" onClick={handleSendMessage}>
          Send via WhatsApp
        </Button>
      </Form>
    </Container>
  );
};

export default SendMessageWhatsApp;
