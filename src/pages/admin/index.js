import Layout from '../../components/shared/Layout';
import AdminContainer from '../../components/shared/AdminContainer';
import Link from 'next/link';

const Admin = () => {
  return (
    <Layout>
      <AdminContainer>
        <div className="row m-0 p-0 pb-5 mt-5">
          <div className="col-lg-2 col-sm-1" />
          <div className="col-lg-8 col-sm-10 d-flex flex-column w-100 mt-5">
            <div className="row m-0">
              <div className="col-lg-12 col-sm-12">
                <div className="row display-4 mb-5 p-0 m-0">
                  Admin Dashboard
                </div>
                <ul className="list-group">
                  <li className="list-group-item list-group-item-action">
                    <Link href="admin/categories-tags">
                      <div
                        className="p-2"
                        style={{
                          color: 'black',
                          cursor: 'pointer',
                          fontSize: '16px',
                        }}>
                        Manage Categories and Tags
                      </div>
                    </Link>
                  </li>
                  <li className="list-group-item list-group-item-action">
                    <Link href="admin/users">
                      <div
                        className="p-2"
                        style={{
                          color: 'black',
                          cursor: 'pointer',
                          fontSize: '16px',
                        }}>
                        Manage Users
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-sm-1" />
        </div>
      </AdminContainer>
    </Layout>
  );
};

export default Admin;
