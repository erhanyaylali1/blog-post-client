import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import { getCategory } from '../../utils/apiCall';
import { message } from 'antd';
import CategoryPage from '../../components/category/CategoryPage';

const Category = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState();

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  const fetchCategory = () => {
    getCategory(id).then((response) => {
      if (response.error) message.error(response.error, 1);
      else setCategory(response.category);
    });
  };

  if (!category) return null;
  return (
    <Layout>
      <div className="row m-0 p-0 pb-5">
        <div className="col-lg-2 col-sm-1" />
        <div className="col-lg-8 col-sm-10 d-flex flex-column align-items-center w-100 mt-5">
          <CategoryPage category={category} />
          <div className="col-lg-2 col-sm-1" />
        </div>
      </div>
    </Layout>
  );
};

export default Category;
