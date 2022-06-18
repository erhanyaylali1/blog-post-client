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
import { getCategoryPosts } from '../../utils/apiCall';
import HomePagePostCard from '../post/HomePagePostCard';
import CircularProgress from '@mui/material/CircularProgress';

const { TabPane } = Tabs;

const CategoryPage = ({ category }) => {
  const [popularPosts, setPopularPosts] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [tabIndex, setTabIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      if (tabIndex === 1) {
        if (popularPosts === null) {
          setLoading(true);
          getCategoryPosts(category._id, 'view desc').then((response) => {
            if (response.error) message.error(response.error);
            else setPopularPosts(response.posts);
            setLoading(false);
          });
        }
      } else {
        if (recentPosts === null) {
          setLoading(true);
          getCategoryPosts(category._id, 'createdAt desc').then((response) => {
            if (response.error) message.error(response.error);
            else setRecentPosts(response.posts);
            setLoading(false);
          });
        }
      }
    }
  }, [category, tabIndex]);

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

  const renderCategoryInformation = () => {
    return (
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title={category?.name}
        extra={[
          <Button key="1" type="primary">
            Create a new post
          </Button>,
        ]}
        footer={renderTabs()}>
        <div className="mt-4 d-flex">
          <div className="main">
            <Descriptions size="middle" column={2}>
              <Descriptions.Item label="Category Name">
                {category?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Total Post">
                {category?.count || 0}
              </Descriptions.Item>
              <Descriptions.Item label="Total Likes">
                {category?.likes || 0}
              </Descriptions.Item>
              <Descriptions.Item label="Total Comment">
                {category?.comments || 0}
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
                value={category?.view}
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
        <div>{renderCategoryInformation()}</div>
      </div>
    </div>
  );
};

export default CategoryPage;
