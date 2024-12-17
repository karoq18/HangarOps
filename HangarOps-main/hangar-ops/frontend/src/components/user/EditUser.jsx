import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const EditAircraft = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
    organization: '',
    position: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [organizations, setOrganizations] = useState([]);
  const [positions, setPositions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get-user/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [id]);

  useEffect(() => {
    fetch('http://localhost:8080/names-organization')
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
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/update-user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/manage-user');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mt-4">
            <Card.Body>
              <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Edytuj dane o użytkowniku</h3>
              <Form onSubmit={handleSubmit}>
                   <Form.Group className="mb-3">
                      <Form.Label>Nazwa użytkownika:</Form.Label>
                      <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                   </Form.Group>

                   <Form.Group className="mb-3">
                      <Form.Label>Hasło:</Form.Label>
                      <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                   </Form.Group>

                   <Form.Group className="mb-3">
                       <Form.Label>Adres e-mail:</Form.Label>
                       <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                   </Form.Group>

                   <Form.Group className="mb-3" controlId="organization">
                       <Form.Label>Organizacja:</Form.Label>
                        <Form.Control
                            as="select"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                        >
                            <option value="">Wybierz organizacje:</option>
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
                            <option value="">Wybierz stanowisko:</option>
                            {positions.map(position => (
                                <option key={position} value={position}>{position}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                     <Form.Group className="mb-3">
                        <Form.Label>Rola:</Form.Label>
                        <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} />
                     </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">Zapisz zmiany</Button>
                    </div>
                </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAircraft;
