import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/shared/Layout';
import UserContainer from '../../components/shared/UserContainer';

const Category = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <UserContainer>
        <div>Category</div>
      </UserContainer>
    </Layout>
  );
};

export default Category;
