import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import SignUpForm from './components/login/SignUpForm';
import Dashboard from './components/dashboard/Dashboard';
import UserProfile from './components/profile/UserProfile';
import { UserProvider, useUser } from './context/UserContext';
import ManageOrganizations from './components/organization/ManageOrganizations';
import AddOrganization from './components/organization/AddOrganization';
import EditOrganization from './components/organization/EditOrganization';
import ManageAircraft from './components/aircraft/ManageAircraft';
import AddAircraft from './components/aircraft/AddAircraft';
import EditAircraft from './components/aircraft/EditAircraft';
import Layout from './components/layout/Layout';
import ManageUser from './components/user/ManageUser';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';
import ManageService from './components/service/ManageService';
import AddService from './components/service/AddService';
import EditService from './components/service/EditService';
import ProtectedRoute from './components/protected/ProtectedRoute';

function App() {
  function RequireAuth({ children, redirectTo }) {
    const { user } = useUser();
    return user ? <Layout>{children}</Layout> : <Navigate to={redirectTo} />;
  }

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/profile" element={<RequireAuth redirectTo="/login"><UserProfile /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth redirectTo="/login"><Dashboard /></RequireAuth>} />
          <Route path="/manage-user" element={<RequireAuth redirectTo="/login"><ManageUser /></RequireAuth>} />
          <Route path="/add-user" element={<RequireAuth redirectTo="/login"><AddUser /></RequireAuth>} />
          <Route path="/get-user/:id" element={<RequireAuth redirectTo="/login"><EditUser /></RequireAuth>} />
          <Route path="/manage" element={<RequireAuth redirectTo="/login"><ManageOrganizations /></RequireAuth>} />
          <Route path="/edit-organization/:id" element={<RequireAuth redirectTo="/login"><EditOrganization /></RequireAuth>} />
          <Route path="/add-organization" element={<RequireAuth redirectTo="/login"><AddOrganization /></RequireAuth>} />
          <Route path="/manage-aircraft" element={<RequireAuth redirectTo="/login"><ManageAircraft /></RequireAuth>} />
          <Route path="/add-aircraft" element={<RequireAuth redirectTo="/login"><AddAircraft /></RequireAuth>} />
          <Route path="/edit-aircraft/:id" element={<RequireAuth redirectTo="/login"><EditAircraft /></RequireAuth>} />
          <Route path="/add-service" element={<RequireAuth redirectTo="/login"><AddService /></RequireAuth>} />
          <Route path="/edit-service/:id" element={<RequireAuth redirectTo="/login"><EditService /></RequireAuth>} />
          <Route path="/manage-service" element={<RequireAuth redirectTo="/login"><ManageService /></RequireAuth>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
