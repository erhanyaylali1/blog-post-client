import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Empty, message, Popconfirm } from 'antd';
import UserRoles from '../../config/UserRoles';
import { deleteCategory, getCategories } from '../../utils/apiCall';
import { getCookie, isAuth } from '../../utils/browserOperations';
import CreateCategoryModal from './CreateCategoryModal';
import styles from './category.module.css';
import { CircularProgress } from '@mui/material';

const Category = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = isAuth();

  useEffect(() => {
    if (!user) router.push('login');
    if (user.role !== UserRoles.Admin) router.push('/');
    else fetchCategories();
  }, [refresh]);

  const fetchCategories = async () => {
    const token = getCookie('token');
    if (token) {
      setLoading(true);
      getCategories(token).then((response) => {
        if (response.error) message.error(response.error, 1);
        else {
          setCategories(
            response.categories.sort((a, b) => (a.count < b.count ? 1 : -1))
          );
        }
        setLoading(false);
      });
    }
  };

  const handleDeleteCategory = (slug) => {
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
  };

  const renderCategories = () => {
    if (loading)
      return (
        <div className="my-5 w-100 text-center">
          <CircularProgress />
        </div>
      );
    if (categories.length > 0) {
      return categories.map((category, index) => (
        <li
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
          key={category._id}>
          <Link to={`/categories/${category._id}`}>
            <div style={{ cursor: 'pointer' }}>
              {index + 1} - {category.name}
            </div>
          </Link>
          <div>
            <span className="badge badge-primary badge-pill mr-2">
              {category.count}
            </span>
            <Popconfirm
              placement="topLeft"
              title={'Are you sure you want to delete this category?'}
              onConfirm={() => handleDeleteCategory(category.slug)}
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

  const openCreateCategoryModal = () => setShowCreateCategoryModal(true);
  const closeCreateCategoryModal = () => setShowCreateCategoryModal(false);

  return (
    <React.Fragment>
      <div className="column">
        <div className="row pr-md-5">
          <h4 className="ml-3">Categories</h4>
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
