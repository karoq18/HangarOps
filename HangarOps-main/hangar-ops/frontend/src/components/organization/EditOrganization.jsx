import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const EditOrganization = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    licenses: 0,
    types: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizationsData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get-organization/${id}`);
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

    fetchOrganizationsData();
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
      const response = await fetch(`http://localhost:8080/update-organization/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      navigate('/manage');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mt-4">
            <Card.Body>
              <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Edytuj organizację</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupName">
                  <Form.Label>Nazwa organizacji:</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formGroupContact">
                  <Form.Label>Dane kontaktowe:</Form.Label>
                  <Form.Control type="text" name="contact" value={formData.contact} onChange={handleChange} />
                </Form.Group>

                    <Form.Group controlId="formGroupLicenses">
                      <Form.Label>Numer licencji:</Form.Label>
                      <Form.Control type="number" name="licenses" value={formData.licenses} onChange={handleChange} />
                    </Form.Group>

                <Form.Group controlId="formGroupType">
                  <Form.Label>Typy:</Form.Label>
                  <Form.Control type="text" name="types" value={formData.types} onChange={handleChange} />
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

export default EditOrganization;
