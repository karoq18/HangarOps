import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const AddUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: '',
        organization: '',
        position: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [positions, setPositions] = useState([]);
    const navigate = useNavigate();

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
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password || !formData.email) {
            setShowAlert(true);
        } else {
            try {
                const response = await fetch('http://localhost:8080/add-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Błąd HTTP! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Odpowiedź serwera:', data);

            } catch (error) {
                console.error('Błąd przy próbie przetwarzania JSON:', error);
            }

            navigate('/manage-user');
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="mt-4">
                        <Card.Body>
                            <h2 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Dodaj użytkownika</h2>
                            {showAlert && (
                                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                                    Wszystkie pola muszą być wypełnione!
                                </Alert>
                            )}
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
                                    <Button variant="primary" type="submit">Dodaj użytkownika</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUser;
