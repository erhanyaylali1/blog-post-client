import Layout from '../../components/shared/Layout';
import AdminContainer from '../../components/shared/AdminContainer';
import Link from 'next/link';

const Admin = () => {
  return (
    <Layout>
      <AdminContainer>
        <div className="row mx-0 my-4    text-center">
          <h2 className="mx-auto">Admin Profile</h2>
        </div>
        <div className="row mt-5 px-5">
          <div className="col-md-4 col-sm-12">
            <Link href="admin/categories-tags" className="btn btn-primary row">
              Manage Categories and Tags
            </Link>
          </div>
          <div className="col-md-8 col-sm-12">Others</div>
        </div>
      </AdminContainer>
    </Layout>
  );
};

export default Admin;
