import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPost, increaseViewCount } from '../../utils/apiCall';
import { isAuth } from '../../utils/browserOperations';
import { message } from 'antd';
import PostPageView from '../../components/post/PostPageView';
import PostPageEdit from '../../components/post/PostPageEdit';
import Layout from '../../components/shared/Layout';
import UserRoles from '../../config/UserRoles';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const user = isAuth();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (id) {
      increaseViewCountOfThisPost();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPostData();
    }
  }, [refresh]);

  const isSessionUserAuthorOfPost = () => {
    if (user.role === UserRoles.Admin) return true;
    return user?._id === post?.user_id?._id;
  };

  const fetchPostData = () => {
    setTimeout(() => {
      getPost(id).then((response) => {
        if (response?.error) message.error(response.error, 1);
        setPost(response.post);
      });
    }, 500);
  };

  const increaseViewCountOfThisPost = () => {
    increaseViewCount(id)
      .then((response) => {
        if (response.error) console.error(response.error);
        else console.log(response.message);
      })
      .then(() => {
        fetchPostData();
      });
  };

  if (!post) return <div>Loading...</div>;

  const refreshPage = () => setRefresh(!refresh);

  return (
    <Layout>
      <div className="row m-0 p-0 pb-5">
        <div className="col-lg-2 col-sm-1" />
        <div className="col-lg-8 col-sm-10 d-flex flex-column align-items-center w-100 mt-5">
          {isSessionUserAuthorOfPost() ? (
            <PostPageEdit post={post} refreshPage={refreshPage} />
          ) : (
            <PostPageView post={post} refreshPage={refreshPage} />
          )}
        </div>
        <div className="col-lg-2 col-sm-1" />
      </div>
    </Layout>
  );
};

export default Post;
