import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card, Row, Col, ProgressBar } from 'react-bootstrap';
import ProtectedElement from '../protected/ProtectedElement';

const ManageService = () => {
  const navigate = useNavigate();
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    fetch('/get-maintenances')
      .then(response => response.json())
      .then(data => setMaintenances(data))
      .catch(error => console.error('Error fetching organizations:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/delete-maintenance/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMaintenances(maintenances.filter(org => org.id !== id));
      } else {
        throw new Error('Failed to delete the maintenances');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-service/${id}`);
  };

  const calculateDaysToStart = (startDate) => {
    const current = new Date();
    const start = new Date(startDate);
    const timeDiff = start - current;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Konwersja milisekund na dni
    return daysDiff;
  };

  const calculateDaysToEnd = (completionDate) => {
    const current = new Date();
    const end = new Date(completionDate);
    const timeDiff = end - current;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Konwersja milisekund na dni
    return daysDiff;
  };

  const getProgressLabel = (daysToStart, daysToEnd) => {
    if (daysToStart > 0) {
      return `Do startu pozostało ${daysToStart} dni`;
    } else if (daysToEnd < 0) {
      return 'Zakończono';
    } else {
      return `Pozostało ${daysToEnd} dni`;
    }
  };

  return (
    <Container fluid className="px-3 py-4">
      <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Zarządzaj aktywnymi usługami</h3>
      <Row>
        {maintenances.map((org) => {
          const daysToStart = calculateDaysToStart(org.startDate);
          const daysToEnd = calculateDaysToEnd(org.completionDate);
          return (
            <Col md={3} key={org.id}>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div>
                  {org.aircraft}
                    <br />
                  {org.organization}
                  </div>
                  <div>
                  {org.description}
                    <br />
                  {org.location}
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title className="border-bottom">
                    <div className="mb-2 small">Pilot: {org.pilot}</div>
                    <div className="mb-2 small">Mechanicy: {org.mechanic}</div>
                  </Card.Title>
                  <Card.Text>
                    <Row>
                      <Col>
                        <p className="text-center">Start:</p>
                        <p className="text-center">{org.startDate ? org.startDate.substring(0, 10) : 'Brak daty rozpoczęcia'}</p>
                      </Col>
                      <Col xs={6} className="d-flex align-items-center">
                        <div className="w-100 position-relative">
                          <ProgressBar
                            now={daysToStart > 0 ? 0 : daysToEnd < 0 ? 100 : 100 - daysToEnd} // Uwzględnij różne przypadki
                            variant={daysToEnd < 0 ? 'success' : 'info'}
                            style={{ height: '30px' }}
                          />
                          <span className="position-absolute w-100 text-center" style={{ top: '0', height: '30px', lineHeight: '30px' }}>
                            {getProgressLabel(daysToStart, daysToEnd)}
                          </span>
                        </div>
                      </Col>
                      <Col>
                        <p className="text-center">Zakończenie:</p>
                        <p className="text-center">{org.completionDate ? org.completionDate.substring(0, 10) : 'Brak daty zakończenia'}</p>
                      </Col>
                    </Row>
                  </Card.Text>
                  <div className="text-center mt-2">
                    <ProtectedElement roles={['mod', 'admin']}>
                      <Button variant="primary" className="me-2" onClick={() => handleEdit(org.id)}>Edytuj</Button>
                      <Button variant="danger" onClick={() => handleDelete(org.id)}>Usuń</Button>
                    </ProtectedElement>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <ProtectedElement roles={['mod', 'admin']}>
      <div className="text-center mt-4">
        <Button variant="success" onClick={() => navigate('/add-service')}>Dodaj nową usługę</Button>
      </div>
       </ProtectedElement>
    </Container>
  );
};

export default ManageService;
