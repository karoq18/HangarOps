import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Table, Card } from 'react-bootstrap';
import ProtectedElement from '../protected/ProtectedElement';

const ManageAircraft = () => {
  const navigate = useNavigate();
  const [aircraft, setaircraft] = useState([]);


  useEffect(() => {
    fetch('/get-aircrafts')
        .then(response => response.json())
        .then(data => setaircraft(data))
        .catch(error => console.error('Error fetching aircraft:', error));
  }, []);

   const handleDelete = async (id) => {
       try {
         const response = await fetch(`http://localhost:8080/delete-aircraft/${id}`, {
           method: 'DELETE',
         });
         if (response.ok) {
           setaircraft(aircraft.filter(org => org.id !== id));
         } else {
           throw new Error('Failed to delete the aircraft');
         }
       } catch (error) {
         console.error('Error:', error);
       }
     };

  const handleEdit = (id) => {
    navigate(`/edit-aircraft/${id}`);
  };

  return (
    <Container fluid className="px-3 py-4">
      <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Zarządzaj samolotami</h3>
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Rejestracja</th>
                <th className="text-center">Model</th>
                <th className="text-center">Typ</th>
                <th className="text-center">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {aircraft.map((org) => (
                <tr key={org.id}>
                  <td className="text-center align-middle">{org.register}</td>
                  <td className="text-center align-middle">{org.model}</td>
                  <td className="text-center align-middle">{org.type}</td>
                  <td>
                  <div className="text-center mt-2">
                  <ProtectedElement roles={['mod', 'admin']}>
                    <Button variant="primary" className="me-2" onClick={() => handleEdit(org.id)}>Edytuj</Button>
                    <Button variant="danger" onClick={() => handleDelete(org.id)}>Usuń</Button>
                    </ProtectedElement>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div className="text-center mt-4">
      <ProtectedElement roles={['mod', 'admin']}>
        <Button variant="success" onClick={() => navigate('/add-aircraft')}>Dodaj nowy samolot</Button>
        </ProtectedElement>
      </div>
    </Container>
  );
};

export default ManageAircraft;
