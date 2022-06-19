import React, { useEffect, useState } from 'react';
import { Segmented, message } from 'antd';
import { getUserPosts } from '../../utils/apiCall';
import HomePagePostCard from '../post/HomePagePostCard';

const UserTabs = ({ user }) => {
  const [value, setValue] = useState('Posts');
  const [posts, setPosts] = useState(null);
  const id = user?._id;

  useEffect(() => {
    if (id && value === 'Posts' && posts === null) {
      getUserPosts(id).then((response) => {
        if (response.error) message.error(response.error);
        else setPosts(response.posts);
      });
    }
  }, [id, value]);

  const renderTabs = () => {
    if (value === 'Posts' && posts?.length > 0) {
      return posts.map((post) => (
        <HomePagePostCard post={{ ...post, user_id: user }} key={post._id} />
      ));
    }
  };

  return (
    <React.Fragment>
      <div className="mt-3 d-flex justify-content-center">
        <div className="w-50">
          <Segmented
            options={['Posts', 'Likes', 'Comments']}
            block
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="py-2 px-5 mt-5">{renderTabs()}</div>
    </React.Fragment>
  );
};

export default UserTabs;
