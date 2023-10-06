import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Input, message, Popconfirm, Select } from 'antd';
import { deletePost, editPost, getCategories } from '../../utils/apiCall';
import { getCookie, isAuth } from '../../utils/browserOperations';
import Editor from '../../components/editor';
import { CloseOutlined } from '@ant-design/icons';
import UploadImage from '../../components/shared/UploadImage';
import PostPageView from './PostPageView';
import Switch from '@mui/material/Switch';
import styles from './style.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import { Buffer } from "buffer";

const PostPageEdit = ({ post, refreshPage, isAdmin }) => {
  const navigate = useNavigate();
  const user = isAuth();
  const token = getCookie('token'); 
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(post?.title || '');

  const [categories, setCategories] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [mode, setMode] = useState('View');

  const [selectedCategories, setSelectedCategories] = useState(
    post?.categories?.map((category) => category._id)
  );
  const [selectedTags, setSelectedTags] = useState(
    post?.tags?.map((tag) => tag.name)
  );

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) navigate('/login');
    fetchCategoriesAndTags();
  }, []);

  const fetchCategoriesAndTags = async () => {
    const categories = await getCategories(token);
    setCategories(categories.categories);
  };

  const handleSave = () => {
    setLoading(true);
    const formData = new FormData();

    const editor = document.querySelector('.editor-input');
    const content = editor.innerHTML;

    if (post.title !== title) formData.set('title', title);
    if (post.content !== content) formData.set('content', content);
    if (post.categories !== selectedCategories)
      formData.set('categories', selectedCategories);
    if (post.tags !== selectedTags) formData.set('tags', selectedTags);
    if (image?.length > 0) formData.set('photo', image[0]);

    editPost(post._id, formData, token).then((response) => {
      if (response.error) {
        message.error(response.error);
      } else {
        message
          .success(response.message, 1)
          .then(() => navigate(0));
      }
      setLoading(false);
    });
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <Select.Option key={category._id} value={category._id}>
        {category.name}
      </Select.Option>
    ));
  };

  const renderTags = () => {
    return selectedTags.map((tag) => {
      return (
        <div className="mr-2 mb-2" key={tag}>
          <div
            className={`badge badge-light d-flex flex-row align-items-center`}
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              padding: '7px 10px',
            }}>
            <p className="p-0 m-0 mr-3">#{tag}</p>
            <div
              style={{
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
              }}
              onClick={() => deleteTag(tag)}>
              <CloseOutlined
                style={{
                  color: 'rgba(0, 0, 0, 0.45)',
                  fontWeight: 'bold',
                  fontSize: '10px',
                }}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  const addNewTag = () => {
    setSelectedTags([...selectedTags, newTag]);
    setNewTag('');
  };

  const deleteTag = (tagName) => {
    setSelectedTags([...selectedTags.filter((tag) => tag !== tagName)]);
  };

  const isButtonDisabled = () => {
    if (title.length === 0 || selectedCategories.length === 0) {
      return true;
    } else return false;
  };

  const imageSource = () => {
    if (image?.length) {
      return URL.createObjectURL(image[0]);
    } else {
      return `data:Buffer;base64,${Buffer.from(post?.photo?.data).toString(
        'base64'
      )}`;
    }
  };

  const handleDeletePost = () => {
    deletePost(post._id, token).then((response) => {
      if (response.error) message.error(response.error, 1);
      else {
        message.success(response.message, 1);
        navigate('/');
      }
    });
  };

  const cancel = () => navigate(0);

  if (categories.length === 0) return null;
  else {
    return (
      <div className="w-100">
        <div className="row d-flex align-items-center justify-content-end w-100 mb-4">
          {isAdmin || user._id === post.user_id._id ? (
            <React.Fragment>
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
                className={`m-0 mr-2 ${
                  mode === 'Edit' ? 'text-dark' : 'text-muted'
                }`}>
                Edit
              </p>
            </React.Fragment>
          ) : null}
          <Popconfirm
            placement="topLeft"
            title={'Are you sure you want to delete this post?'}
            onConfirm={handleDeletePost}
            okText="Yes"
            cancelText="No">
            <Button
              type="text"
              danger
              className="ml-3 d-flex align-items-center"
              icon={<DeleteOutlined />}>
              <div
                className="ml-2"
                style={{ marginTop: '2px', fontSize: '15px' }}>
                Delete
              </div>
            </Button>
          </Popconfirm>
        </div>
        {mode === 'View' ? (
          <PostPageView post={post} refreshPage={refreshPage} />
        ) : (
          <div className="row m-0 p-0 pb-5 w-100">
            <div className="col-lg-12 col-sm-12 d-flex flex-column align-items-center w-100 m-0">
              {post?.photo || image?.length ? (
                <div className="row mx-1 my-1 w-100 mb-4">
                  <img className={styles.card_image} src={imageSource()} />
                </div>
              ) : null}
              <div className="input-group mt-2 mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Title
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  aria-label="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="row m-0 my-2">
                <UploadImage image={image} setImage={setImage} />
              </div>
              <Editor content={post.content} />
              <div className="row m-0 my-2 w-100">
                <p>Select Category</p>
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .includes(input.toLocaleLowerCase())
                  }
                  mode="multiple"
                  placeholder="Please select"
                  value={selectedCategories}
                  onChange={(e) => {
                    setSelectedCategories(e);
                  }}
                  style={{ width: '100%' }}>
                  {renderCategories()}
                </Select>
              </div>
              <div className="row m-0 my-2 w-100 d-flex flex-column">
                <p>Tags</p>
                <div className="w-100 d-flex">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addNewTag()}
                    style={{
                      borderTopRightRadius: '0',
                      borderBottomRightRadius: '0',
                      width: '100%'
                    }}
                  />
                  <Button
                    type="primary"
                    style={{
                      borderTopLeftRadius: '0',
                      borderBottomLeftRadius: '0',
                    }}
                    onClick={addNewTag}>
                    Add
                  </Button>
                </div>
                <div className="row m-0 w-100 flex mt-3">{renderTags()}</div>
              </div>
              <div className="row m-0 p-0 w-100 mt-3 mb-5">
                <div className="col-4 col-md-2 ml-auto">
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
                <div className="col-4 col-md-2 ml-2">
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleSave}
                    loading={loading}
                    disabled={isButtonDisabled()}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default PostPageEdit;
