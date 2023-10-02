import { useEffect, useState } from 'react';
import Layout from '../components/shared/Layout';
import { getPosts } from '../utils/apiCall';
import { isAuth } from '../utils/browserOperations';
import { Empty, message } from 'antd';
import HomePagePostCard from '../components/post/HomePagePostCard';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  const user = isAuth();
  const isLogged = user ? true : false;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    getPosts().then((response) => {
      if (response && response.error) message.error(message.error, 1);
      else setPosts(response && response.posts);
      setLoading(false);
    });
  };

  const renderCreatePostButton = () => {
    const button_text = isLogged ? 'Create New Post' : 'Login to Create Post';
    const button_link = isLogged ? '/post/create-post' : '/login';
    return (
      <div className="row w-100 ">
        <div className="text-center ml-auto">
          <Link href={button_link}>
            <button className="btn btn-primary">{button_text}</button>
          </Link>
        </div>
      </div>
    );
  };

  const renderPosts = () => {
    if (loading)
      return (
        <div className="my-5 w-100 text-center">
          <CircularProgress />
        </div>
      );
    if (posts && posts.length > 0) {
      return posts.map((post) => (
        <HomePagePostCard post={post} key={post._id} />
      ));
    } else {
      return (
        <div className="mt-5">
          <Empty />
        </div>
      );
    }
  };

  return (
    <Layout>
      <main>
        <div className="m-0 mt-5 row">
          <div className="col-lg-3 col-sm-1" />
          <div className="col-lg-6 col-sm-10">
            {renderCreatePostButton()}
            <div className="mt-5">{renderPosts()}</div>
          </div>
          <div className="col-lg-3 col-sm-1" />
          <Analytics />
        </div>
      </main>
    </Layout>
  );
};

export default Home;
