import React, { useEffect, useState } from 'react';
import { Segmented, message } from 'antd';
import {
  getUserComments,
  getUserLikes,
  getUserPosts,
} from '../../utils/apiCall';
import HomePagePostCard from '../post/HomePagePostCard';
import { CircularProgress } from '@mui/material';

const UserTabs = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('Posts');
  const [posts, setPosts] = useState(null);
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState(null);
  const id = user?._id;

  useEffect(() => {
    if (id && value === 'Posts' && posts === null) {
      setLoading(true);
      getUserPosts(id).then((response) => {
        if (response.error) message.error(response.error);
        else setPosts(response.posts);
        setLoading(false);
      });
    } else if (id && value === 'Likes' && likes === null) {
      setLoading(true);
      getUserLikes(id).then((response) => {
        if (response.error) message.error(response.error);
        else setLikes(response.posts);
        setLoading(false);
      });
    } else if (id && value === 'Comments' && comments === null) {
      setLoading(true);
      getUserComments(id).then((response) => {
        if (response.error) message.error(response.error);
        else setComments(response.posts);
        setLoading(false);
      });
    }
  }, [id, value]);

  const renderTabs = () => {
    if (loading) {
      return (
        <div className="my-5 w-100 h-100 d-flex align-items-center justify-content-center">
          <CircularProgress />
        </div>
      );
    }
    if (value === 'Posts' && posts?.length > 0) {
      return posts.map((post) => (
        <HomePagePostCard post={{ ...post, user_id: user }} key={post._id} />
      ));
    } else if (value === 'Likes' && likes?.length > 0) {
      return likes.map((post) => (
        <HomePagePostCard post={post} key={post._id} />
      ));
    } else if (value === 'Comments' && comments?.length > 0) {
      return comments.map((post) => (
        <HomePagePostCard post={post} key={post._id} />
      ));
    }
  };

  return (
    <React.Fragment>
      <div className="mt-3 d-flex justify-content-center row">
       <div className='col-0 col-md-3'></div>
       <div className='col-12 col-md-6'>
          <Segmented
            options={['Posts', 'Likes', 'Comments']}
            block
            value={value}
            onChange={setValue}
          />
       </div>
       <div className='col-0 col-md-3'></div>
      </div>
      <div className="py-0 py-md-2 px-0 px-md-5 mt-5">{renderTabs()}</div>
    </React.Fragment>
  );
};

export default UserTabs;
