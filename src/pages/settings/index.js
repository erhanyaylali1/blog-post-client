import React, { useState } from 'react';
import Layout from '../../components/shared/Layout';
import UserContainer from '../../components/shared/UserContainer';
import { useForm } from 'react-hook-form';
import { getCookie, isAuth, signOut } from '../../utils/browserOperations';
import { Button, message } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import { logoutFromServer, updateAccount } from '../../utils/apiCall';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  const user = isAuth();
  const token = getCookie('token');
  const [disabled, setDisabled] = useState({
    full_name: true,
    email: true,
    password: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    updateAccount(user._id, { full_name: name, email, password }, token).then(
      (response) => {
        if (response.error) message.error(response.error);
        else {
          message.success('Account updated successfully');
          signOut(functionAfterLogout);
        }
      }
    );
  };

  const functionAfterLogout = () => {
    logoutFromServer();
    router.push('/login');
  };

  const toggleEditMode = (property) => {
    setDisabled({ ...disabled, [property]: !disabled[property] });
  };

  return (
    <Layout>
      <UserContainer>
        <div className="row m-0 p-0 pb-5">
          <div className="col-lg-2 col-sm-1" />
          <div className="col-lg-8 col-sm-10 d-flex flex-column align-items-center w-100 mt-5">
            <div className="my-4 font-weight-bold">Account Settings</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              className="w-75">
              <div className="form-group">
                <label className="form-label mr-2 mb-3">Full Name</label>
                {disabled.full_name ? (
                  <Button
                    type="link"
                    icon={<FormOutlined />}
                    onClick={toggleEditMode.bind(this, 'full_name')}
                  />
                ) : (
                  <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={toggleEditMode.bind(this, 'full_name')}
                  />
                )}
                <input
                  defaultValue={user.full_name}
                  className="form-control"
                  disabled={disabled.full_name}
                  {...register('name')}
                />
              </div>
              <div className="form-group mt-4">
                <label className="form-label mr-2 mb-3">Email</label>
                {disabled.email ? (
                  <Button
                    type="link"
                    icon={<FormOutlined />}
                    onClick={toggleEditMode.bind(this, 'email')}
                  />
                ) : (
                  <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={toggleEditMode.bind(this, 'email')}
                  />
                )}
                <input
                  className="form-control"
                  defaultValue={user.email}
                  disabled={disabled.email}
                  {...register('email')}
                />
              </div>
              <div className="form-group mt-4 mb-4">
                <label className="form-label">Password</label>
                {disabled.password ? (
                  <Button
                    type="link"
                    icon={<FormOutlined />}
                    onClick={toggleEditMode.bind(this, 'password')}
                  />
                ) : (
                  <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={toggleEditMode.bind(this, 'password')}
                  />
                )}
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter New Password"
                  {...register('password')}
                  disabled={disabled.password}
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    disabled.password && disabled.email && disabled.full_name
                  }>
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-2 col-sm-1" />
        </div>
      </UserContainer>
    </Layout>
  );
};

export default index;
