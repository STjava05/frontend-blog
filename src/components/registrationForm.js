

import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../reducers/apiSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [isSumitted, setIsSubmitted] = useState(false); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(registerUser(userData));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSumitted) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  }, [isSumitted]);

  return (
    <Container className='p-5'>  
    <div>
      <h2>Registrazione</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Cognome:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Registrati</Button>
      </Form>
    </div>
    </Container>
  );
};

export default RegistrationForm;

