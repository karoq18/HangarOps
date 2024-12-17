import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const AddAircraft = () => {
  const [formData, setFormData] = useState({
    register: '',
    model: '',
    type: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.register || !formData.model || !formData.type) {
      setShowAlert(true);
    } else {
      try {
        const response = await fetch('http://localhost:8080/add-aircraft', {
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

             navigate('/manage-aircraft');
           }
         };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mt-4">
            <Card.Body>
              <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Dodaj samolot</h3>
              {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  Wszystkie pola muszą być wypełnione!
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Rejestracja:</Form.Label>
                  <Form.Control type="text" name="register" value={formData.register} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Model:</Form.Label>
                  <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} />
                </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Typ:</Form.Label>
                      <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
                    </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit">Dodaj samolot</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddAircraft;
