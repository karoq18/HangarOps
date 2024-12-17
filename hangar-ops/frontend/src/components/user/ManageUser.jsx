import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Table, Card } from 'react-bootstrap';

const ManageUser = () => {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);


  useEffect(() => {
    fetch('/get-users')
        .then(response => response.json())
        .then(data => setusers(data))
        .catch(error => console.error('Error fetching aircraft:', error));
  }, []);

   const handleDelete = async (id) => {
       try {
         const response = await fetch(`http://localhost:8080/delete-user/${id}`, {
           method: 'DELETE',
         });
         if (response.ok) {
           setusers(users.filter(org => org.id !== id));
         } else {
           throw new Error('Failed to delete the users');
         }
       } catch (error) {
         console.error('Error:', error);
       }
     };

  const handleEdit = (id) => {
    navigate(`/get-user/${id}`);
  };

  return (
    <Container fluid className="px-3 py-4">
      <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Zarządzaj użytkownikami</h3>
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Nazwa użytkownika</th>
                <th className="text-center">Hasło</th>
                <th className="text-center">Adres e-mail</th>
                <th className="text-center">Organizacja</th>
                <th className="text-center">Stanowisko</th>
                <th className="text-center">Rola</th>
                <th className="text-center">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {users.map((org) => (
                <tr key={org.id}>
                  <td className="text-center align-middle">{org.username}</td>
                  <td className="text-center align-middle">{org.password}</td>
                  <td className="text-center align-middle">{org.email}</td>
                  <td className="text-center align-middle">{org.organization}</td>
                  <td className="text-center align-middle">{org.position}</td>
                  <td className="text-center align-middle">{org.role}</td>
                  <td>
                  <div className="text-center mt-2">
                    <Button variant="primary" className="me-2" onClick={() => handleEdit(org.id)}>Edytuj</Button>
                    <Button variant="danger" onClick={() => handleDelete(org.id)}>Usuń</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <div className="text-center mt-4">
        <Button variant="success" onClick={() => navigate('/add-user')}>Dodaj nowego użytkownika</Button>
      </div>
    </Container>
  );
};

export default ManageUser;
