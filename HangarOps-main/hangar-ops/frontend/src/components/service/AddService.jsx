import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

function AddService() {
  const [formData, setFormData] = useState({
    description: '',
    serviceStatus: 'Aktywna',
    serviceLocation: '',
    });
    const navigate = useNavigate();
    const [aircraft, setAircraft] = useState([]);
    const [pilot, setPilot] = useState([]);
    const [mechanics, setMechanic] = useState([]);
    const [organization, setOrganization] = useState([]);
    const [selectedAircraft, setSelectedAircraft] = useState('');
    const [selectedPilot, setSelectedPilot] = useState('');
    const [selectedMechanics, setSelectedMechanics] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [startDate, setStartDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

    useEffect(() => {
        fetch('/names-organization')
              .then(response => { return response.json();})
              .then(data => { setOrganization(data); })
              .catch(error => { console.error('There was an error fetching the organizations!', error);
              });
        fetch('/get-aircrafts')
              .then(response => { return response.json();})
              .then(data => { setAircraft(data); })
              .catch(error => { console.error('There was an error fetching the aircraft!', error);
              });
        fetch('/get-users')
              .then(response => { return response.json();})
              .then(data => {
                  const mechanics = data.filter(user => user.position === 'Mechanic');
                  setMechanic(mechanics);
              })
              .catch(error => { console.error('There was an error fetching the mechanic!', error);
              });
        fetch('/get-users')
              .then(response => { return response.json();})
              .then(data => {
                  const pilots = data.filter(user => user.position === 'Pilot');
                  setPilot(pilots);
              })
              .catch(error => { console.error('There was an error fetching the pilot!', error);
              });
    }, []);

   const handleSubmit = async (e) => {
       e.preventDefault();
       const serviceData = {
           aircraft: selectedAircraft,
           organization: selectedOrganization,
           description: formData.description,
           status: formData.serviceStatus,
           location: formData.serviceLocation,
           pilot: selectedPilot,
           mechanic: selectedMechanics.join(', '),
           startDate: startDate,
           completionDate: completionDate
       };

       console.log(serviceData);

       try {
           const response = await fetch('http://localhost:8080/add-maintenance', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(serviceData)
           });

           if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
           }

           const data = await response.json();
           console.log('Server response:', data);
           navigate('/manage-service');
       } catch (error) {
           console.error('Error during data submission:', error);
           navigate('/manage-service');
       }

    };
    return (
         <Container>
             <Row className="justify-content-center">
               <Col lg={8}>
                 <Card className="mt-4">
                   <Card.Body>
                    <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Zarejestruj nową usługę</h3>
                    <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Samolot</Form.Label>
                         <Form.Control as="select" value={selectedAircraft} onChange={e => setSelectedAircraft(e.target.value)}>
                             <option value="" disabled selected>Wybierz samolot</option>
                             {aircraft.map(aircraft => (
                                 <option key={aircraft.id} value={aircraft.register}>{aircraft.register}</option>
                             ))}
                         </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Organizacja</Form.Label>
                            <Form.Control as="select" value={selectedOrganization} onChange={e => setSelectedOrganization(e.target.value)}>
                                <option value="" disabled selected>Wybierz organizację</option>
                                {organization.map(organization => (
                                <option key={organization} value={organization}>{organization}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                       </Col>
                       </Row>

                        <Row>
                        <Col>
                          <Form.Group className="mb-3">
                              <Form.Label>Opis</Form.Label>
                            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                              <Form.Label>Lokalizacja</Form.Label>
                              <Form.Control type="text" name="serviceLocation" value={formData.serviceLocation} onChange={handleChange} />
                          </Form.Group>
                         </Col>
                         </Row>

                            <Form.Group className="mb-3">
                              <Form.Label>Pilot</Form.Label>
                              <Form.Control as="select" value={selectedPilot} onChange={e => setSelectedPilot(e.target.value)}>
                                <option value="" disabled selected>Wybierz pilota</option>
                                {pilot.map(pilot => (
                                  <option key={pilot.id} value={pilot.username}>{pilot.username}</option>
                                ))}
                              </Form.Control>
                            </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mechanicy</Form.Label>
                            <Form.Control as="select" multiple value={selectedMechanics} onChange={e => setSelectedMechanics([...e.target.selectedOptions].map(option => option.value))}>
                              <option value="" disabled selected>Zaznacz mechaników</option>
                                {mechanics.map(mechanics => (
                                    <option key={mechanics.id} value={mechanics.username}>{mechanics.username}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Row>
                          <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Data Rozpoczęcia</Form.Label>
                            <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </Form.Group>
                        </Col>

                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Data Zakończenia</Form.Label>
                            <Form.Control type="date" value={completionDate} onChange={e => setCompletionDate(e.target.value)} />
                        </Form.Group>
                        </Col>
                        </Row>
                        <div className="text-center mt-4">
                        <Button variant="primary" type="submit">Dodaj Usługę</Button>
                        </div>
                    </Form>
                </Card.Body>
                </Card>
               </Col>
             </Row>
         </Container>
    );
}

export default AddService;
