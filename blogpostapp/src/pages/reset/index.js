import { message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/shared/Layout';
import { checkPasswordResetLink, resetPassword } from '../../utils/apiCall';

const ResetPassword = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    if (id) {
      checkPasswordResetLink(id).then((response) => {
        if (response.error) {
          console.log(response.error);
          message.error(response.error);
          router.push('/login');
        }
      });
    }
  }, [id]);

  const onSubmit = async (data) => {
    const { password } = data;
    resetPassword({ token: id, password }).then((response) => {
      if (response.error) message.error(response.error);
      else {
        message.success('Password updated successfully');
        router.push('/login');
      }
    });
  };

  const watchAllFields = watch(['password', 'password-again']);

  return (
    <Layout>
      <div className="row m-0 p-0 pb-5">
        <div className="col-lg-2 col-sm-1" />
        <div className="col-lg-8 col-sm-10 d-flex flex-column align-items-center w-100 mt-5 pt-5">
          <div style={{ fontSize: '2rem', fontWeight: '400' }}>
            Reset Password
          </div>
          <div className="w-100">
            <form
              className="w-50 mt-5 mx-auto"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  className="form-control"
                  type="password"
                  {...register('password', { required: true, minLength: 8 })}
                />
                {errors.password &&
                  (errors.password.type === 'required' ? (
                    <span
                      style={{
                        color: '#ca0000',
                        fontSize: '12px',
                        lineHeight: '14px',
                        fontWeight: 500,
                      }}>
                      *This field is required
                    </span>
                  ) : (
                    <span
                      style={{
                        color: '#ca0000',
                        fontSize: '12px',
                        lineHeight: '14px',
                        fontWeight: 500,
                      }}>
                      *Password must be minimum 8 character
                    </span>
                  ))}
              </div>
              <div className="form-group">
                <label className="form-label">New Password (Again)</label>
                <input
                  className="form-control"
                  type="password"
                  {...register('password-again', {
                    required: true,
                    minLength: 8,
                  })}
                />
                {watchAllFields[0] != watchAllFields[1] && (
                  <span
                    style={{
                      color: '#ca0000',
                      fontSize: '12px',
                      lineHeight: '14px',
                      fontWeight: 500,
                    }}>
                    Passwords don't match
                  </span>
                )}
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-2 col-sm-1" />
      </div>
    </Layout>
  );
};

export default ResetPassword;
