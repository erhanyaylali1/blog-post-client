import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './auth.module.css';
import { registerToServer } from '../../utils/apiCall';
import { isAuth } from '../../utils/browserOperations';
import UserRoles from '../../config/UserRoles';
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const navigate = useNavigate();

  // IF USER ALREADY LOGGED IN, THEN REDIRECT TO THE HOME PAGE
  useEffect(() => {
    const user = isAuth();
    const isLogged = user ? true : false;
    if (isLogged) navigateUser(user);
  }, []);

  const navigateUser = (user) => {
    if (user.role === UserRoles.User) navigate('/user');
    else navigate('/admin');
  };

  // HANDLE REGISTER FORM SUBMIT
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    registerToServer({ full_name: name, email, password }).then((response) => {
      // IF ERROR EXIST IN RESPONSE, SHOW IN UI
      if (response.error) {
        message.error(response.error, 1);
      } else {
        // INFORM USER THAT REGISTER WAS SUCCESSFUL
        message.success('Successfully Registered!', 1);
        // RESET THE FIELDS
        // AFTER 1 SECOND, REDIRECT TO HOME PAGE
        setTimeout(() => {
          reset();
          navigate('/login');
        }, 1000);
      }
    });
  };

  // WATCH PASSWORD AND REPEAT PASSWORD TO CHECK WHETHER THEY ARE SAME OR NOT
  const watchAllFields = watch(['password', 'password-again']);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete="off">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            {...register('name', { required: true, maxLength: 20 })}
          />
          {errors.name && (
            <span className={styles.error}>*This field is required</span>
          )}
        </div>
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
          <label className="form-label">Password (Again)</label>
          <input
            className="form-control"
            type="password"
            {...register('password-again', { required: true, minLength: 8 })}
          />
          {watchAllFields[0] != watchAllFields[1] && (
            <span className={styles.error}>Passwords don't match</span>
          )}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
