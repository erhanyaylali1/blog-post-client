import React from 'react';
import Avatar from '../shared/Avatar';
import { Statistic } from 'antd';
import { LikeOutlined, EyeOutlined, FundOutlined } from '@ant-design/icons';
import styles from './style.module.css';

const UserProfileHeaderView = ({ user, countries }) => {
  const country = countries?.find((c) => c.code === user?.user?.country)?.name;

  return (
    <div className="card py-2">
      <div className="card-body">
        <div className="row px-5">
          <div className="mr-4">
            <Avatar
              name={user?.user?.full_name}
              image={
                user?.user?.photo
                  ? `data:Buffer;base64,${Buffer.from(
                      user?.user?.photo?.data
                    ).toString('base64')}`
                  : ''
              }
              link={`/user/${user?.user?._id}`}
              size={70}
            />
          </div>
          <div className="ml-1 mt-2">
            <h5 className="display-4" style={{ fontSize: '3rem' }}>
              {user?.user?.full_name}
            </h5>
          </div>
        </div>
        <div className="row m-0 mt-4">
          <div className="col-12 mb-4 px-3">
            <div className={styles.header_item_title}>About</div>
            <div className={styles.header_item_text}>
              {user?.user?.about || '-'}
            </div>
          </div>
          <div className="col-7 mt-3" style={{ borderRight: '2px solid #ccc' }}>
            <div className="row pl-3">
              <div className="col-4 p-0">
                <div className={styles.header_item_container}>
                  <div className={styles.header_item_title}>Member Since</div>
                  <div className={styles.header_item_text}>
                    {new Date(user?.user?.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="col-8 p-0">
                <div className={styles.header_item_container}>
                  <div className={styles.header_item_title}>Website</div>
                  <div className={styles.header_item_text}>
                    {user?.user?.domain ? (
                      <a
                        href={user?.user?.domain}
                        target="_blank"
                        rel="noopener noreferrer">
                        {user?.user?.domain}
                      </a>
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mt-3">
                <div className={styles.header_item_container}>
                  <div className={styles.header_item_title}>Country</div>
                  <div className={styles.header_item_text}>
                    {country || '-'}
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mt-3">
                <div className={styles.header_item_container}>
                  <div className={styles.header_item_title}>Job</div>
                  <div className={styles.header_item_text}>
                    {user?.user?.job || '-'}
                  </div>
                </div>
              </div>
              <div className="col-4 p-0 mt-3">
                <div className={styles.header_item_container}>
                  <div className={styles.header_item_title}>Birthday</div>
                  <div className={styles.header_item_text}>
                    {user?.user?.birthday || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 mt-3">
            <div className="row d-flex justify-content-center p-0 m-0 mb-3">
              <div className={styles.header_item_title}>Post Statistics</div>
            </div>
            <div className="row p-0 m-0 post-statics">
              <div className="col-4 text-center">
                <Statistic
                  title="Total Count"
                  value={user?.count}
                  prefix={<FundOutlined />}
                />
              </div>
              <div className="col-4 text-center">
                <Statistic
                  title="Total View"
                  value={user?.view}
                  prefix={<EyeOutlined />}
                />
              </div>
              <div className="col-4 text-center">
                <Statistic
                  title="Total Like"
                  value={user?.likes}
                  prefix={<LikeOutlined />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeaderView;
