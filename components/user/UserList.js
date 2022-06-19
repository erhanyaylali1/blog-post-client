import React, { useEffect, useState, useContext, createContext } from 'react';
import { deleteUser, getUsers, updateUserRole } from '../../utils/apiCall';
import { Table, Form, message, Button, Select, Popconfirm } from 'antd';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import Avatar from '../shared/Avatar';
import UserRoles from '../../config/UserRoles';
import moment from 'moment';
import { FormOutlined } from '@ant-design/icons';
import { getCookie } from '../../utils/browserOperations';

const EditableContext = createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(
    record?.role === UserRoles.User ? 'User' : 'Admin'
  );
  const form = useContext(EditableContext);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = () => {
    toggleEdit();
    handleSave(record._id, value);
  };

  const cancel = () => toggleEdit();

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <div className="d-flex">
        <div className="m-0 mr-4 p-0 py-1 d-flex justify-content-center align-items-center">
          <Select value={value} onChange={(value) => setValue(value)}>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="User">User</Select.Option>
          </Select>
        </div>
        <div className="m-0 p-0 pr-4 d-flex justify-content-around align-items-center">
          <Button className="mr-2" type="text" onClick={cancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={save}>
            Save
          </Button>
        </div>
      </div>
    ) : (
      <div className="editable-cell-value-wrap d-flex justify-content-around w-100">
        <div>{children}</div>
        <div>
          <Button shape="circle" icon={<FormOutlined />} onClick={toggleEdit} />
        </div>
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const UserList = () => {
  const token = getCookie('token');
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers().then((response) => {
      if (response.error) message.error(response.error);
      else {
        setUsers(response.users);
      }
      setLoading(false);
    });
  }, [refresh]);

  let columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      width: '50px',
      render: (image, record) => (
        <Avatar
          image={
            image
              ? `data:Buffer;base64,${Buffer.from(image?.data).toString(
                  'base64'
                )}`
              : ''
          }
          name={record.full_name}
          link={`/user/${record._id}`}
          size={40}
        />
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text, record) => (
        <Link href={`/user/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '200px',
      editable: true,
      render: (text) => (
        <Select value={text === UserRoles.User ? 'User' : 'Admin'} disabled>
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="User">User</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Member Since',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <div>{moment(text).format('MMM Do, YYYY')}</div>,
    },
    ,
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Popconfirm
          placement="topLeft"
          title={'Are you sure you want to delete this user?'}
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No">
          <Button danger type="text" size="middle">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleSave = (id, row) => {
    updateUserRole(id, { role: UserRoles[row] }, token).then((response) => {
      if (response.error) message.error(response.error);
      else {
        message.success(response.message, 0.5);
        setRefresh(!refresh);
      }
    });
  };

  const handleDelete = (id) => {
    deleteUser(id, token).then((response) => {
      if (response.error) message.error(response.error);
      else {
        message.success(response.message, 0.5);
        setRefresh(!refresh);
      }
    });
  };

  return (
    <div className="row m-0 p-0 pb-5">
      <div className="col-lg-1 col-sm-1" />
      <div className="col-lg-10 col-sm-10 d-flex flex-column align-items-center w-100 mt-4">
        {loading ? (
          <div className="my-5 w-100 h-100 d-flex align-items-center justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <Table
            components={{
              body: {
                row: EditableRow,
                cell: EditableCell,
              },
            }}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={users}
            columns={columns}
          />
        )}
      </div>
      <div className="col-lg-1 col-sm-1" />
    </div>
  );
};

export default UserList;
