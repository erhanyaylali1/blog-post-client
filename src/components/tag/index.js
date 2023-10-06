import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { message, Empty } from 'antd';
import UserRoles from '../../config/UserRoles';
import { deleteTag, getTags } from '../../utils/apiCall';
import { getCookie, isAuth } from '../../utils/browserOperations';
import CreateCategoryModal from './CreateTagModal';
import styles from './tag.module.css';
import { CircularProgress } from '@mui/material';
import { Popconfirm } from 'antd';

const Tag = () => {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showCreateTagModal, setShowCreateTagModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = isAuth();

  useEffect(() => {
    if (!user) router.push('login');
    if (user.role !== UserRoles.Admin) router.push('/');
    else fetchTags();
  }, [refresh]);

  const fetchTags = async () => {
    const token = getCookie('token');
    if (token) {
      setLoading(true);
      getTags(token).then((response) => {
        if (response.error) message.error(response.error, 1);
        else {
          setTags(response.tags.sort((a, b) => (a.count < b.count ? 1 : -1)));
        }
        setLoading(false);
      });
    }
  };

  const handleDeleteTag = (slug) => {
    const token = getCookie('token');
    if (token) {
      deleteTag(token, slug).then((response) => {
        if (response.error) message.error(response.error, 1);
        else {
          message.success(response.message, 1);
          setRefresh((prev) => !prev);
        }
        setLoading(false);
      });
    }
  };

  const renderTags = () => {
    if (loading)
      return (
        <div className="my-5 w-100 text-center">
          <CircularProgress />
        </div>
      );
    if (tags.length > 0) {
      return tags.map((tag, index) => (
        <li
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          key={tag._id}>
          <Link href={`/tags/${tag._id}`}>
            <div style={{ cursor: 'pointer' }}>
              {index + 1} - {tag.name}
            </div>
          </Link>
          <div>
            <span className="badge badge-primary badge-pill mr-2">
              {tag.count}
            </span>
            <Popconfirm
              placement="topLeft"
              title={'Are you sure you want to delete this tag?'}
              onConfirm={() => handleDeleteTag(tag.slug)}
              okText="Yes"
              cancelText="No">
              <span
                className="badge badge-danger"
                style={{ cursor: 'pointer' }}>
                Delete
              </span>
            </Popconfirm>
          </div>
        </li>
      ));
    } else {
      return (
        <div className="mt-5">
          <Empty />
        </div>
      );
    }
  };

  const openCreateCategoryModal = () => setShowCreateTagModal(true);
  const closeCreateCategoryModal = () => setShowCreateTagModal(false);

  return (
    <React.Fragment>
      <div className="column my-5 my-md-0">
        <div className="row pr-md-5">
          <h4 className="ml-3">Tags</h4>
          <div className="row ml-auto d-flex align-items-center pr-md-5">
            <button
              className="btn btn-link mr-md-3"
              onClick={openCreateCategoryModal}>
              Create
            </button>
          </div>
        </div>
        <div className="row mt-4 pr-md-5">
          <div className="col mx-0 px-0 pr-md-5">
            <ul className={`list-group ${styles.tags_container}`}>
              {renderTags()}
            </ul>
          </div>
        </div>
      </div>
      {showCreateTagModal && (
        <CreateCategoryModal
          closeModal={closeCreateCategoryModal}
          setRefresh={setRefresh}
        />
      )}
    </React.Fragment>
  );
};

export default Tag;
