import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    organization: '',
    position: '',
    role: 'mod',
  });

  const [organizations, setOrganizations] = useState([]);
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/names-organization')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setOrganizations(data);
      })
      .catch(error => {
        console.error('There was an error fetching the organizations!', error);
      });

    fetch('/users/positions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPositions(data);
      })
      .catch(error => {
        console.error('There was an error fetching the positions!', error);
      });
  }, []);

   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData(prevState => {
       const newFormData = { ...prevState, [name]: value };

       if (name === 'position') {
         newFormData.role = value === 'Logistic' ? 'mod' : 'User';
       }

       return newFormData;
     });
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        navigate('/login');
      })
      .then(data => {
        console.log('Form data submitted:', data);
      })
      .catch(error => {
        console.error('There was an error submitting the form data!', error);
        navigate('/login');
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={6} className="mx-auto">
          <Form onSubmit={handleSubmit} className="p-4 shadow-sm rounded bg-body">
            <h3 className="text-uppercase text-center py-3">Rejestracja nowego konta</h3>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nazwa użytkownika:</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Wpisz nazwę użytkownika"
                value={formData.username}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Hasło:</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Wpisz hasło"
                value={formData.password}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Adres e-mail:</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Wpisz adres e-mail"
                value={formData.email}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="organization">
              <Form.Label>Organizacja:</Form.Label>
              <Form.Control
                as="select"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              >
                <option value="">Wybierz swoją organizacje:</option>
                {organizations.map(organization => (
                  <option key={organization} value={organization}>{organization}</option>
                ))}
              </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="position">
              <Form.Label>Stanowisko:</Form.Label>
              <Form.Control
                as="select"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">Wybierz swoje stanowisko:</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button type="submit" className="w-100 btn-lg btn-primary">Zarejestruj się</Button>
            <Form.Group className="text-center mt-3">
              Masz już konto? <Link to="/login">Zaloguj się</Link>
            </Form.Group>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;
