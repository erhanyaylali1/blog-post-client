import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Empty, message } from 'antd';
import UserRoles from '../../config/UserRoles';
import { deleteCategory, getCategories } from '../../utils/apiCall';
import { getCookie, isAuth } from '../../utils/browserOperations';
import CreateCategoryModal from './CreateCategoryModal';
import styles from './category.module.css';

const Category = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const user = isAuth();

  useEffect(() => {
    if (!user) router.push('login');
    if (user.role !== UserRoles.Admin) router.push('/');
    else fetchCategories();
  }, [refresh]);

  const fetchCategories = async () => {
    const token = getCookie('token');
    if (token) {
      getCategories(token).then((response) =>
        setCategories(
          response.categories.sort((a, b) => (a.count < b.count ? 1 : -1))
        )
      );
    }
  };

  const handleDeleteCategory = (slug) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const token = getCookie('token');
      if (token) {
        deleteCategory(token, slug).then((response) => {
          if (response.error) message.error(response.error, 1);
          else {
            message.success(response.message, 1);
            setRefresh((prev) => !prev);
          }
        });
      }
    }
  };

  const renderCategories = () => {
    if (categories.length > 0) {
      return categories.map((category, index) => (
        <li
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          key={category._id}>
          <Link href={`/categories/${category._id}`}>
            <div style={{ cursor: 'pointer' }}>
              {index + 1} - {category.name}
            </div>
          </Link>
          <div>
            <span className="badge badge-primary badge-pill mr-2">
              {category.count}
            </span>
            <span
              className="badge badge-danger"
              onClick={() => handleDeleteCategory(category.slug)}
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

  const openCreateCategoryModal = () => setShowCreateCategoryModal(true);
  const closeCreateCategoryModal = () => setShowCreateCategoryModal(false);

  return (
    <React.Fragment>
      <div className="column">
        <div className="row pr-5">
          <h4 className="ml-3">Categories</h4>
          <div className="row ml-auto d-flex align-items-center pr-5">
            <button
              className="btn btn-link mr-3"
              onClick={openCreateCategoryModal}>
              Create New Category
            </button>
          </div>
        </div>
        <div className="row mt-4 pr-5">
          <div className="col mx-0 px-0 pr-5">
            <ul className={`list-group ${styles.categories_container}`}>
              {renderCategories()}
            </ul>
          </div>
        </div>
      </div>
      {showCreateCategoryModal && (
        <CreateCategoryModal
          closeModal={closeCreateCategoryModal}
          setRefresh={setRefresh}
        />
      )}
    </React.Fragment>
  );
};

export default Category;
