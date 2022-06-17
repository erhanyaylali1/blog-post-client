import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/shared/Layout';
import UserContainer from '../../components/shared/UserContainer';

const Tag = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <UserContainer>
        <div>Tag</div>
      </UserContainer>
    </Layout>
  );
};

export default Tag;
