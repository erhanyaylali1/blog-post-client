import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './category.module.css';
import { createCategory } from '../../utils/apiCall';
import { getCookie } from '../../utils/browserOperations';
import { message } from 'antd';

const CreateCategoryModal = ({ closeModal, setRefresh }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setNewCategoryName(e.target.value);

  const handleSave = () => {
    setLoading(true);
    const token = getCookie('token');
    if (token) {
      createCategory({ name: newCategoryName }, token)
        .then((response) => {
          if (response.error) {
            message.error(response.error, 1);
          } else {
            message.success(response.message, 1);
            setRefresh((prev) => !prev);
            closeModal();
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Box className={styles.modal}>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <React.Fragment>
            <h5>Create New Category</h5>
            <div className="form-group mt-3">
              <label for="new_category_name">Category Name</label>
              <input
                className="form-control"
                id="new_category_name"
                type="text"
                placeholder="Enter Category name"
                value={newCategoryName}
                autoFocus
                onChange={handleInputChange}
              />
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <button
                  className="btn btn-danger btn-sm btn-block"
                  onClick={closeModal}>
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-primary btn-sm btn-block"
                  disabled={!newCategoryName.length}
                  onClick={handleSave}>
                  Submit
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default CreateCategoryModal;
