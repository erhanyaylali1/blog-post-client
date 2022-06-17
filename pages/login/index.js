import LoginComponent from '../../components/auth/LoginComponent';
import Layout from '../../components/shared/Layout';

const Login = () => {
  return (
    <Layout>
      <div className="row m-0 mt-md-5">
        <div className="col-lg-3 col-sm-12">
          <div className="mt-5 ml-auto d-flex justify-content-center">
            <h3 className="display-4">Login</h3>
          </div>
        </div>
        <div className="col-lg-8 col-sm-12">
          <LoginComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
