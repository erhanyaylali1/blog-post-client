import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import UserProfileHeaderView from '../../components/user/UserProfileHeaderView';
import { getUser, getCountries } from '../../utils/apiCall';
import CircularProgress from '@mui/material/CircularProgress';
import UserTrends from '../../components/user/UserTrends';
import UserTabs from '../../components/user/UserTabs';
import { isAuth } from '../../utils/browserOperations';
import UserProfileHeaderEdit from '../../components/user/UserProfileHeaderEdit';
import { useParams } from 'react-router-dom';

const User = () => {
  const sessionUser = isAuth();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [countries, setCountries] = useState([]);
  const isOwner = sessionUser._id === user?.user?._id;

  useEffect(() => {
    if (id) fetchUser();
  }, [id, refresh]);

  useEffect(() => {
    getCountries().then((response) => {
      if (response.error) console.log(response.error);
      else {
        setCountries(
          response
            .map((country) => ({
              name: country.name.common,
              code: country.cca3,
              flag: country.flags.png,
            }))
            .sort((country1, country2) => {
              return country1.name.localeCompare(country2.name);
            })
        );
      }
    });
  }, []);

  const fetchUser = () => {
    setLoading(true);
    getUser(id).then((response) => {
      if (response.error) message.error(response.error, 1);
      else setUser(response);
      setLoading(false);
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="my-5 w-100 text-center">
          <CircularProgress />
        </div>
      );
    }
    if (!user) return null;

    return (
      <React.Fragment>
        {isOwner ? (
          <UserProfileHeaderEdit
            user={user}
            setRefresh={setRefresh}
            countries={countries}
          />
        ) : (
          <UserProfileHeaderView user={user} countries={countries} />
        )}
        <UserTrends trends={user?.trends}  />
        <UserTabs user={user?.user} posts={user?.posts} />
      </React.Fragment>
    );
  };

  return (
    <div className="row m-0 p-0 pb-5">
      <div className="col-lg-2 col-sm-1" />
      <div className="col-lg-8 col-sm-10 d-flex flex-column w-100 mt-5">
        <div className="row m-0">
          <div className="col-lg-12 col-sm-12">{renderContent()}</div>
        </div>
      </div>
      <div className="col-lg-2 col-sm-1" />
    </div>
  );
};

export default User;
