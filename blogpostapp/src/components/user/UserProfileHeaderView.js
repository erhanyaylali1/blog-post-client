import React from 'react';
import Avatar from '../shared/Avatar';
import { Statistic } from 'antd';
import { LikeOutlined, EyeOutlined, FundOutlined } from '@ant-design/icons';
import styles from './style.module.css';
import { Buffer } from "buffer";

const UserProfileHeaderView = ({ user, countries }) => {
  const country = countries?.find((c) => c.code === user?.user?.country)?.name;

  return (
    <div className="card py-2">
      <div className="card-body">
        <div className="row px-md-5">
          <div className="col-4 col-md-1 d-flex align-items-center">
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
          <div className="col-8 col-md-11 d-flex align-items-center">
            <h5 className={`display-4 ${styles.username} mb-0`}>
              {user?.user?.full_name}
            </h5>
          </div>
        </div>
        <div className="row m-0 mt-4">
          <div className="col-12 mb-4 px-3">
            <div className={styles.header_item_title}>About</div>
            <div className={`${styles.header_item_text} w-100`} style={{ textAlign: "left" }}>
              {user?.user?.about || '-'}
            </div>
          </div>
          <div className={`col-xs-12 col-md-7 mt-3`}>
            <div className="row pl-3">
              <div className="col-xs-12 col-md-4 p-0">
                <div className={`${styles.header_item_container} d-flex`}>
                  <div className={styles.header_item_title}>Member Since</div>
                  <div className={styles.header_item_text}>
                    {new Date(user?.user?.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-8 p-0 mt-3 mt-md-0">
                <div className={`${styles.header_item_container} d-flex`}>
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
              <div className="col-xs-12 col-md-4 p-0 mt-3">
                <div className={`${styles.header_item_container} d-flex`}>
                  <div className={styles.header_item_title}>Country</div>
                  <div className={styles.header_item_text}>
                    {country || '-'}
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 p-0 mt-3">
                <div className={`${styles.header_item_container} d-flex`}>
                  <div className={styles.header_item_title}>Job</div>
                  <div className={styles.header_item_text}>
                    {user?.user?.job || '-'}
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 p-0 mt-3">
                <div className={`${styles.header_item_container} d-flex`}>
                  <div className={styles.header_item_title}>Birthday</div>
                  <div className={styles.header_item_text}>
                    {user?.user?.birthday || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-5 mt-5">
            <div className="row d-flex justify-content-center p-0 m-0 mb-3">
              <div className={`${styles.header_item_title} w-100 text-center`}>
                Post Statistics
              </div>
            </div>
            <div className="row p-0 m-0 post-statics">
              <div className="col-4 text-center">
                <Statistic
                  title="Total Count"
                  value={user?.count}
                  className={styles.ant_statistic_content}
                  prefix={<FundOutlined />}
                />
              </div>
              <div className="col-4 text-center">
                <Statistic
                  title="Total View"
                  value={user?.view}
                  className={styles.ant_statistic_content}
                  prefix={<EyeOutlined />}
                />
              </div>
              <div className="col-4 text-center">
                <Statistic
                  title="Total Like"
                  value={user?.likes}
                  className={styles.ant_statistic_content}
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
