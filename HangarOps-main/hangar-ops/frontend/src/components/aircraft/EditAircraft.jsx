import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const EditAircraft = () => {
  const [formData, setFormData] = useState({
    register: '',
    model: '',
    type: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAircraftsData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get-aircraft/${id}`);

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

    fetchAircraftsData();
  }, [id]);

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
      const response = await fetch(`http://localhost:8080/update-aircraft/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/manage-aircraft');
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
              <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Edytuj dane o samolocie</h3>
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

                <div className="d-flex justify-content-center mt-4">
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
