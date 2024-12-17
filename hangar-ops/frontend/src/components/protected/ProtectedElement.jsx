import React from 'react';
import { useUser } from '../../context/UserContext';

const ProtectedElement = ({ roles, children }) => {
  const { user } = useUser();

  if (!user || !roles.includes(user.role)) {
    return null;
  }

  return children;
};

export default ProtectedElement;
