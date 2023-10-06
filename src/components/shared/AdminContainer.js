import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuth } from '../../utils/browserOperations';
import UserRoles from '../../config/UserRoles';

const AdminContainer = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push('/login');
    } else if (isAuth().role !== UserRoles.Admin) {
      router.push('/');
    }
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AdminContainer;
