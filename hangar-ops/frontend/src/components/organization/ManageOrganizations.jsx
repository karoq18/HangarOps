import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Table, Card } from 'react-bootstrap';
import ProtectedElement from '../protected/ProtectedElement';

const ManageOrganizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);


  useEffect(() => {
    fetch('/get-organizations')
        .then(response => response.json())
        .then(data => setOrganizations(data))
        .catch(error => console.error('Error fetching organizations:', error));
  }, []);

   const handleDelete = async (id) => {
       try {
         const response = await fetch(`http://localhost:8080/delete-organization/${id}`, {
           method: 'DELETE',
         });
         if (response.ok) {
           setOrganizations(organizations.filter(org => org.id !== id));
         } else {
           throw new Error('Failed to delete the organization');
         }
       } catch (error) {
         console.error('Error:', error);
       }
     };

  const handleEdit = (id) => {
    navigate(`/edit-organization/${id}`);
  };

  return (
    <Container fluid className="px-3 py-4">
      <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Zarządzaj organizacjami</h3>
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Nazwa organizacji</th>
                <th className="text-center">Dane kontaktowe</th>
                <th className="text-center">Liczba mechaników</th>
                <th className="text-center">Liczba licencji</th>
                <th className="text-center">Typ</th>
                <th className="text-center">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org.id}>
                  <td className="text-center align-middle">{org.name}</td>
                  <td className="text-center align-middle">{org.contact}</td>
                  <td className="text-center align-middle">{org.mechanics}</td>
                  <td className="text-center align-middle">{org.licenses}</td>
                  <td className="text-center align-middle">{org.types}</td>
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
        <Button variant="success" onClick={() => navigate('/add-organization')}>Dodaj nową organizację</Button>
        </ProtectedElement>
      </div>
    </Container>
  );
};

export default ManageOrganizations;
