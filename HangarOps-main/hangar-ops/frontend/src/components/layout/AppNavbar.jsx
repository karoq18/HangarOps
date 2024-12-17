import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useUser } from '../../context/UserContext';
import { Navbar, Nav, Button, Container} from 'react-bootstrap';
import ProtectedElement from '../protected/ProtectedElement';

const AppNavbar = () => {

    const { logout } = useUser();
    const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        navigate('/login');
      };


  return (
    <Container fluid className="px-3">
    <Navbar bg="light" expand="lg" className="px-3 mb-5 text-center p-3 bg-light shadow">
              <LinkContainer to="/dashboard">
                <Navbar.Brand href="/login"><h4 className="text-uppercase">Panel użytkownika</h4></Navbar.Brand>
              </LinkContainer>
              <ProtectedElement roles={['admin']}>
               <LinkContainer to="/manage-user">
                <Nav.Link className="mx-3"><h6 className="text-uppercase">Użytkownicy</h6></Nav.Link>
                </LinkContainer>
                </ProtectedElement>
              <Nav className="me-auto">
                <LinkContainer to="/manage">
                 <Nav.Link className="mx-3"><h6 className="text-uppercase">Organizacje</h6></Nav.Link>
                </LinkContainer>
                <LinkContainer to="/manage-aircraft">
                <Nav.Link className="mx-3"><h6 className="text-uppercase">Samoloty</h6></Nav.Link>
                </LinkContainer>
                  <LinkContainer to="/manage-service">
                 <Nav.Link className="mx-3"><h6 className="text-uppercase">Usługi</h6></Nav.Link>
                  </LinkContainer>
                </Nav>
                <Nav className="ms-auto">
                <LinkContainer to="/profile">
                 <Nav.Link className="mx-3"><h6 className="text-uppercase">Edycja profilu</h6></Nav.Link>
                </LinkContainer>
                <Button variant="outline-primary" onClick={handleLogout} className="ms-auto">Wyloguj</Button>
              </Nav>
          </Navbar>
    </Container>
  );
};

export default AppNavbar;
