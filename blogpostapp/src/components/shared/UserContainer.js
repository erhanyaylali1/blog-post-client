import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { isAuth } from '../../utils/browserOperations';

const UserContainer = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate('/login');
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default UserContainer;
