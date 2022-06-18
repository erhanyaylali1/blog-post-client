import React, { useEffect, useState } from 'react';
import {
  Button,
  Descriptions,
  PageHeader,
  Statistic,
  Tabs,
  message,
  Empty,
} from 'antd';
import { getTagPosts } from '../../utils/apiCall';
import HomePagePostCard from '../post/HomePagePostCard';
import CircularProgress from '@mui/material/CircularProgress';

const { TabPane } = Tabs;

const TagPage = ({ tag }) => {
  const [popularPosts, setPopularPosts] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [tabIndex, setTabIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tag) {
      if (tabIndex === 1) {
        if (popularPosts === null) {
          setLoading(true);
          getTagPosts(tag._id, 'view desc').then((response) => {
            if (response.error) message.error(response.error);
            else setPopularPosts(response.posts);
            setLoading(false);
          });
        }
      } else {
        if (recentPosts === null) {
          setLoading(true);
          getTagPosts(tag._id, 'createdAt desc').then((response) => {
            if (response.error) message.error(response.error);
            else setRecentPosts(response.posts);
            setLoading(false);
          });
        }
      }
    }
  }, [tag, tabIndex]);

  const renderTabs = () => {
    return (
      <Tabs defaultActiveKey={1} onChange={(e) => setTabIndex(e)}>
        <TabPane tab="Popular Posts" key="1">
          {renderPosts(popularPosts)}
        </TabPane>
        <TabPane tab="Recents Posts" key="2">
          {renderPosts(recentPosts)}
        </TabPane>
      </Tabs>
    );
  };

  const renderTagInformation = () => {
    return (
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title={tag?.name}
        extra={[
          <Button key="1" type="primary">
            Create a new post
          </Button>,
        ]}
        footer={renderTabs()}>
        <div className="mt-4 d-flex">
          <div className="main">
            <Descriptions size="middle" column={2}>
              <Descriptions.Item label="Tag Name">
                {tag?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Total Post">
                {tag?.count || 0}
              </Descriptions.Item>
              <Descriptions.Item label="Total Likes">
                {tag?.likes || 0}
              </Descriptions.Item>
              <Descriptions.Item label="Total Comment">
                {tag?.comments || 0}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="extra">
            <div
              style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: 'flex-end',
              }}>
              <Statistic
                title="Total View"
                value={tag?.view}
                style={{
                  marginRight: 50,
                  textAlign: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </PageHeader>
    );
  };

  const renderPosts = (posts) => {
    if (loading)
      return (
        <div className="my-5 w-100 text-center">
          <CircularProgress />
        </div>
      );
    if (posts?.length > 0) {
      return posts?.map((post) => {
        return (
          <div className="mt-5 mx-auto px-4" key={post._id}>
            <HomePagePostCard post={post} />
          </div>
        );
      });
    } else {
      return (
        <div className="my-5">
          <Empty />
        </div>
      );
    }
  };

  return (
    <div>
      <div className="card p-3">
        <div>{renderTagInformation()}</div>
      </div>
    </div>
  );
};

export default TagPage;
