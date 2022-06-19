import React from 'react';
import AdminContainer from '../../components/shared/AdminContainer';
import Layout from '../../components/shared/Layout';
import UserList from '../../components/user/UserList';

const Users = () => {
  return (
    <Layout>
      <AdminContainer>
        <div className="row mx-0 mt-5 pt-4 text-center">
          <h2 className="mx-auto">Manage Users</h2>
        </div>
        <div className="row mx-0  px-5">
          <div className="col-12">
            <UserList />
          </div>
        </div>
      </AdminContainer>
    </Layout>
  );
};

export default Users;
