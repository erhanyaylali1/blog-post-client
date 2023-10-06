import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './tag.module.css';
import { createTag } from '../../utils/apiCall';
import { getCookie } from '../../utils/browserOperations';
import { message } from 'antd';

const CreateTagModal = ({ closeModal, setRefresh }) => {
  const [newTagName, setNewTagName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setNewTagName(e.target.value);

  const handleSave = () => {
    setLoading(true);
    const token = getCookie('token');
    if (token) {
      createTag({ name: newTagName }, token)
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
            <h5>Create New Tag</h5>
            <div className="form-group mt-3">
              <label for="new_tag_name">Tag Name</label>
              <input
                className="form-control"
                id="new_tag_name"
                type="text"
                placeholder="Enter Tag name"
                value={newTagName}
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
                  disabled={!newTagName.length}
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

export default CreateTagModal;
