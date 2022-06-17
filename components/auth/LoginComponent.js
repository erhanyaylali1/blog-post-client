import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './auth.module.css';
import { loginToServer } from '../../utils/apiCall';
import { authenticate, isAuth } from '../../utils/browserOperations';
import UserRoles from '../../config/UserRoles';
import { message } from 'antd';

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  // IF USER ALREADY LOGGED IN, THEN REDIRECT TO THE HOME PAGE
  useEffect(() => {
    const user = isAuth();
    const isLogged = user ? true : false;
    if (isLogged) navigateUser(user);
  }, []);

  const navigateUser = (user) => {
    if (user.role == UserRoles.User) router.push('/user');
    else router.push('/admin');
  };

  // SUBMIT LOGIN FORM
  const onSubmit = async (data) => {
    const { email, password } = data;
    loginToServer({ email, password }).then(async (response) => {
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
    });
  };

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
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
