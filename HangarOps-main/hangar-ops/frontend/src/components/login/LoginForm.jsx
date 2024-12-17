import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const handleSubmit = (event) => {
     event.preventDefault();
     if (!username || !password) {
       setError('Błędna nazwa użytkownika lub hasło');
     } else {
       fetch('http://localhost:8080/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
          body: JSON.stringify({ username, password })
               })
                 .then(response => response.json().then(data => {
                   if (!response.ok) {
                     throw new Error(data.message);
                   }
                   return data;
                 }))
                 .then(data => {
                   login(data.user);
                   navigate('/dashboard');
                 })
                 .catch(error => {
                   setError(error.message);
                 });
             }
           };

  return (
    <Container className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={6} className="mx-auto">
          <Form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-body">
            <h3 className="text-uppercase text-center py-3">Zaloguj się</h3>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nazwa użytkownika:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wpisz nazwę użytkownika"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Hasło:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Wpisz hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <Form.Text id="passwordHelpBlock" muted>
                Twoje hasło musi składać się przynajmniej z ośmiu znaków, w tym jednego znaku specjalnego oraz cyfry.
              </Form.Text>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" className="w-100 btn-lg btn-primary">Zaloguj się</Button>

            <Form.Group className="text-center">
              Nie masz konta? <Link to="/signup">Zarejestruj się</Link>
            </Form.Group>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
