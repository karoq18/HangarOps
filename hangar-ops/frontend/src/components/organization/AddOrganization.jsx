import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const AddOrganization = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    licenses: 0,
    types: ''
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
    if (!formData.name || !formData.contact || !formData.types || formData.licenses <= 0) {
      setShowAlert(true);
    } else {
      try {
        const response = await fetch('http://localhost:8080/add-organization', {
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

             navigate('/manage');
           }
         };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mt-4">
            <Card.Body>
              <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Dodaj organizację</h3>
              {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  Wszystkie pola muszą być wypełnione i liczby muszą być większe od 0!
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nazwa organizacji:</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Dane kontaktowe:</Form.Label>
                  <Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} />
                </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Numer licencji:</Form.Label>
                      <Form.Control type="number" name="licenses" value={formData.licenses} onChange={handleChange} />
                    </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Typ:</Form.Label>
                  <Form.Control type="text" name="types" value={formData.types} onChange={handleChange} />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button variant="primary" type="submit">Dodaj organizację</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddOrganization;
