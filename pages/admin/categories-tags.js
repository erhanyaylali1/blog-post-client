import React from 'react';
import Category from '../../components/category';
import Tag from '../../components/tag';
import AdminContainer from '../../components/shared/AdminContainer';
import Layout from '../../components/shared/Layout';

const CategoriesTags = () => {
  return (
    <Layout>
      <AdminContainer>
        <div className="row mx-0 my-4 text-center">
          <h2 className="mx-auto">Categories and Tags</h2>
        </div>
        <div className="row mx-0 mt-5 px-5">
          <div className="col-md-6 col-sm-12">
            <Category />
          </div>
          <div className="col-md-6 col-sm-12">
            <Tag />
          </div>
        </div>
      </AdminContainer>
    </Layout>
  );
};

export default CategoriesTags;
