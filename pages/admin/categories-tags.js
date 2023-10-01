import React from 'react';
import Category from '../../components/category';
import Tag from '../../components/tag';
import AdminContainer from '../../components/shared/AdminContainer';
import Layout from '../../components/shared/Layout';

const CategoriesTags = () => {
  return (
    <Layout>
      <AdminContainer>
        <div className="row mx-0 mb-2 mt-5 py-3 text-center">
          <h2 className="mx-auto">Categories and Tags</h2>
        </div>
        <div className="row mx-0 mt-4 px-5">
          <div className="col-12 col-md-6">
            <Category />
          </div>
          <div className="col-12 col-md-6">
            <Tag />
          </div>
        </div>
      </AdminContainer>
    </Layout>
  );
};

export default CategoriesTags;
