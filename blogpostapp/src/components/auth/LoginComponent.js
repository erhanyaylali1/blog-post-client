import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './auth.module.css';
import { loginToServer } from '../../utils/apiCall';
import { authenticate, isAuth } from '../../utils/browserOperations';
import { message } from 'antd';
import Modal from '@mui/material/Modal';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useNavigate } from "react-router-dom";


const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // IF USER ALREADY LOGGED IN, THEN REDIRECT TO THE HOME PAGE
  useEffect(() => {
    const user = isAuth();
    const isLogged = user ? true : false;
    if (isLogged) navigateUser(user);
  }, []);

  const navigateUser = () => {
    navigate('/');
  };

  // SUBMIT LOGIN FORM
  const onSubmit = async (data) => {
    const { email, password } = data;
    loginToServer({ email, password }).then(async (response) => {
      if (response) {
        if (response.error) {
          // IF ERROR EXIST IN RESPONSE, SHOW IN UI
          message.error(response.error, 1);
        } else {
          // INFORM USER THAT LOGIN WAS SUCCESSFUL
          message.success('Successfully Login!', 1);
          // RESET THE FIELDS
          // AFTER 1 SECOND, REDIRECT TO HOME PAGE
          await setTimeout(() => {
            reset();
            authenticate(response, () => navigateUser(response.user));
          }, 1000);
        }
      } else {
        message.error('Something went wrong!', 1);
      }
    });
  };

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete="off">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className={styles.error}>*This field is required</span>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.password &&
            (errors.password.type === 'required' ? (
              <span className={styles.error}>*This field is required</span>
            ) : (
              <span className={styles.error}>
                *Password must be minimum 8 character
              </span>
            ))}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="btn btn-link ml-4" onClick={openModal}>
            Forgot your password?
          </div>
        </div>
      </form>
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ForgotPasswordModal onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default LoginComponent;
