import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function UserProfile() {
  const { user, updateUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
   id: '',
    username: '',
    password: '',
    email: '',
    role: '',
    organization: '',
    position: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.role,
        organization: user.organization,
        position: user.position,
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/update-user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      updateUser(userData);
      setLoading(false);
    }
  };

  return (
   <Container>
         <Row className="justify-content-center">
           <Col lg={8}>
             <Card className="mt-4">
               <Card.Body>
          <h3 className="text-uppercase text-center py-3 bg-light border-bottom shadow-sm">Konto użytkownika</h3>
          {editMode ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Login:</Form.Label>
                <Form.Control type="text" name="username" value={userData.username} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Hasło:</Form.Label>
                <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Adres e-mail:</Form.Label>
                <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className="mt-3">Zapisz zmiany</Button>
                <Button variant="secondary" onClick={handleEditToggle} className="mt-2">Anuluj</Button>
              </div>
            </Form>
          ) : (
            <div>
              <p><strong>Login:</strong> {user.username}</p>
              <p><strong>Hasło:</strong> {user.password}</p>
              <p><strong>Adres e-mail:</strong> {user.email}</p>
              <p><strong>Organizacja:</strong> {user.organization}</p>
              <p><strong>Stanowisko:</strong> {user.position}</p>
              <p><strong>Rola:</strong> {user.role}</p>
              <div className="d-flex justify-content-center mt-4">
                <Button onClick={handleEditToggle} className="mt-2">Edytuj profil</Button>
              </div>
            </div>
          )}
       </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
  );
}

export default UserProfile;
