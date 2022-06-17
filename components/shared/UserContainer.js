import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuth } from '../../utils/browserOperations';

const UserContainer = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push('/login');
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default UserContainer;
