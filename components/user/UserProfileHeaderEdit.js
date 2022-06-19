import React, { useState } from 'react';
import Avatar from '../shared/Avatar';
import Switch from '@mui/material/Switch';
import {
  Input,
  DatePicker,
  Select,
  Popconfirm,
  Button,
  Tooltip,
  message,
} from 'antd';
import moment from 'moment';
import { updateUser } from '../../utils/apiCall';
import styles from './style.module.css';
import UserProfileHeaderView from './UserProfileHeaderView';
import { FormOutlined } from '@ant-design/icons';
import UploadImage from '../shared/UploadImage';
import { getCookie } from '../../utils/browserOperations';
import { useRouter } from 'next/router';

const { TextArea } = Input;
const { Option } = Select;

const UserProfileHeaderEdit = ({ user, setRefresh, countries }) => {
  const token = getCookie('token');
  const router = useRouter();
  const [mode, setMode] = useState('View');
  const [image, setImage] = useState(null);
  const [about, setAbout] = useState(user?.user?.about || '');
  const [domain, setDomain] = useState(user?.user?.domain || '');
  const [country, setCountry] = useState(user?.user?.country || '');
  const [birthday, setBirthday] = useState(user?.user?.birthday || '');
  const [job, setJob] = useState(user?.user?.job || '');

  const dateChange = (date) => {
    setBirthday(date.format('YYYY-MM-DD'));
  };

  const countryChange = (value) => {
    setCountry(value);
  };

  const cancel = () => {
    router.reload(window.location.pathname);
  };

  const handleSave = () => {
    const formData = new FormData();
    if (user?.user?.about !== about) formData.set('about', about);
    if (user?.user?.domain !== domain) formData.set('domain', domain);
    if (user?.user?.country !== country) formData.set('country', country);
    if (user?.user?.birthday !== birthday) formData.set('birthday', birthday);
    if (user?.user?.job !== job) formData.set('job', job);
    if (image?.length) formData.set('photo', image[0]);

    updateUser(user?.user?._id, formData, token).then((response) => {
      if (response.error) message.error(response.error);
      else {
        message.success(response.message, 0.5).then(() => {
          router.reload(window.location.pathname);
        });
      }
    });
  };

  const imageSource = () => {
    if (image?.length) {
      return URL.createObjectURL(image[0]);
    } else {
      if (user?.user?.photo) {
        return `data:Buffer;base64,${Buffer.from(
          user?.user?.photo?.data
        ).toString('base64')}`;
      } else {
        return '';
      }
    }
  };

  return (
    <React.Fragment>
      <div className="w-100 ml-auto m-0 mb-3 d-flex d-flex align-items-center justify-content-end">
        <p
          className={`m-0 mr-2 ${
            mode === 'View' ? 'text-dark' : 'text-muted'
          }`}>
          View
        </p>
        <Switch
          value={mode !== 'View'}
          onChange={(e) => setMode(e.target.checked ? 'Edit' : 'View')}
        />
        <p
          className={`m-0 ml-2 ${
            mode === 'Edit' ? 'text-dark' : 'text-muted'
          }`}>
          Edit
        </p>
      </div>
      {mode === 'View' ? (
        <UserProfileHeaderView user={user} countries={countries} />
      ) : (
        <div className="card py-2">
          <div className="card-body">
            <div className="row px-5">
              <div className="mr-4 d-flex">
                <Avatar
                  name={user?.user?.full_name}
                  image={imageSource()}
                  link={`/user/${user?.user?._id}`}
                  size={70}
                />
                <Tooltip title="Upload Image">
                  <UploadImage
                    image={image}
                    no_text={true}
                    setImage={setImage}
                    shape="circle"
                    icon={<FormOutlined />}
                  />
                </Tooltip>
              </div>
              <div className="ml-1 mt-2">
                <h5 className="display-4" style={{ fontSize: '3rem' }}>
                  {user?.user?.full_name}
                </h5>
              </div>
            </div>
            <div className="row m-0 mt-4">
              <div className="col-12 mb-4 px-3">
                <div className={styles.header_item_title}>About</div>
                <TextArea
                  className="mt-3"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  autoSize={{ minRows: 2, maxRows: 4 }}
                />
              </div>
              <div className="col-12 mt-3">
                <div className="row pl-3">
                  <div className="col-4 p-0">
                    <div className={styles.header_item_container}>
                      <div className={styles.header_item_title}>
                        Member Since
                      </div>
                      <div className={styles.header_item_text}>
                        {new Date(user?.user?.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="col-4 p-0 pr-4">
                    <div className={styles.header_item_container}>
                      <div className={styles.header_item_title}>Website</div>
                      <Input
                        className={styles.header_item_edit_input}
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-4 p-0 pr-4">
                    <div className={styles.header_item_container}>
                      <div className={styles.header_item_title}>Country</div>
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        className={styles.header_item_edit_input}
                        value={country}
                        onChange={countryChange}>
                        {countries.map((country) => (
                          <Option value={country.code}>
                            <img
                              src={country.flag}
                              style={{
                                height: '15px',
                                width: '20px',
                                marginRight: '10px',
                              }}
                            />
                            {country.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-4 p-0 mt-3 pr-4">
                    <div className={styles.header_item_container}>
                      <div className={styles.header_item_title}>Job</div>
                      <Input
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className={styles.header_item_edit_input}
                      />
                    </div>
                  </div>
                  <div className="col-4 p-0 mt-3 pr-4">
                    <div className={styles.header_item_container}>
                      <div className={styles.header_item_title}>Birthday</div>
                      <DatePicker
                        format={'DD/MM/YYYY'}
                        onChange={dateChange}
                        value={
                          moment(birthday).isValid() ? moment(birthday) : null
                        }
                        className={styles.header_item_edit_input}
                      />
                    </div>
                  </div>
                  <div className="col-4 mt-3 d-flex align-items-end justify-content-center">
                    <div className="row w-100">
                      <div className="col-6">
                        <Popconfirm
                          placement="topLeft"
                          title={'Are you sure you want to cancel?'}
                          onConfirm={cancel}
                          okText="Yes"
                          cancelText="No">
                          <Button danger type="text" size="large" block>
                            Cancel
                          </Button>
                        </Popconfirm>
                      </div>
                      <div className="col-6">
                        <Button
                          type="primary"
                          size="large"
                          block
                          onClick={handleSave}>
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserProfileHeaderEdit;
