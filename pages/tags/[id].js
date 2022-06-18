import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import { getTag } from '../../utils/apiCall';
import { message } from 'antd';
import TagPage from '../../components/tag/TagPage';

const Tag = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tag, setTag] = useState();

  useEffect(() => {
    if (id) fetchTag();
  }, [id]);

  const fetchTag = () => {
    getTag(id).then((response) => {
      if (response.error) message.error(response.error, 1);
      else setTag(response.tag);
    });
  };

  if (!tag) return null;
  return (
    <Layout>
      <div className="row m-0 p-0 pb-5">
        <div className="col-lg-2 col-sm-1" />
        <div className="col-lg-8 col-sm-10 d-flex flex-column align-items-center w-100 mt-5">
          <TagPage tag={tag} />
          <div className="col-lg-2 col-sm-1" />
        </div>
      </div>
    </Layout>
  );
};

export default Tag;
