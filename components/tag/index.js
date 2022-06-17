import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { message, Empty } from 'antd';
import UserRoles from '../../config/UserRoles';
import { deleteTag, getTags } from '../../utils/apiCall';
import { getCookie, isAuth } from '../../utils/browserOperations';
import CreateCategoryModal from './CreateTagModal';
import styles from './tag.module.css';

const Tag = () => {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showCreateTagModal, setShowCreateTagModal] = useState(false);
  const user = isAuth();

  useEffect(() => {
    if (!user) router.push('login');
    if (user.role !== UserRoles.Admin) router.push('/');
    else fetchTags();
  }, [refresh]);

  const fetchTags = async () => {
    const token = getCookie('token');
    if (token) {
      getTags(token).then((response) =>
        setTags(response.tags.sort((a, b) => (a.count < b.count ? 1 : -1)))
      );
    }
  };

  const handleDeleteTag = (slug) => {
    if (confirm('Are you sure you want to delete this tag?')) {
      const token = getCookie('token');
      if (token) {
        deleteTag(token, slug).then((response) => {
          if (response.error) message.error(response.error, 1);
          else {
            message.success(response.message, 1);
            setRefresh((prev) => !prev);
          }
        });
      }
    }
  };

  const renderTags = () => {
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
            <span
              className="badge badge-danger"
              onClick={() => handleDeleteTag(tag.slug)}
              style={{ cursor: 'pointer' }}>
              Delete
            </span>
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
      <div className="column">
        <div className="row pr-5">
          <h4 className="ml-3">Tags</h4>
          <div className="row ml-auto d-flex align-items-center pr-5">
            <button
              className="btn btn-link mr-3"
              onClick={openCreateCategoryModal}>
              Create New Tag
            </button>
          </div>
        </div>
        <div className="row mt-4 pr-5">
          <div className="col mx-0 px-0 pr-5">
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
