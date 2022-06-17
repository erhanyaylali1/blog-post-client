import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, message, Select } from 'antd';
import Layout from '../../components/shared/Layout';
import UserContainer from '../../components/shared/UserContainer';
import { createPost, getCategories } from '../../utils/apiCall';
import { getCookie, isAuth } from '../../utils/browserOperations';
import Editor from '../../components/editor';
import { CloseOutlined } from '@ant-design/icons';
import UploadImage from '../../components/shared/UploadImage';

const { Option } = Select;

const CreatePostEditor = () => {
  const router = useRouter();
  const user = isAuth();
  const token = getCookie('token');

  const [title, setTitle] = useState('');

  const [categories, setCategories] = useState([]);
  const [newTag, setNewTag] = useState('');

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) router.push('/login');
    fetchCategoriesAndTags();
  }, []);

  const fetchCategoriesAndTags = async () => {
    const categories = await getCategories(token);
    setCategories(categories.categories);
  };

  const handleSave = () => {
    const editor = document.querySelector('.editor-input');
    const content = editor.innerHTML;
    const formData = new FormData();
    formData.set('title', title);
    formData.set('content', content);
    formData.set('categories', selectedCategories);
    formData.set('tags', selectedTags);
    if (image?.length > 0) formData.set('photo', image[0]);
    createPost(formData, token).then((res) => {
      if (res.error) message.error(res.error, 1);
      else {
        message.success(res.message, 1);
        router.push('/');
      }
    });
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <Option key={category._id} value={category._id}>
        {category.name}
      </Option>
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

  const imageSource = () => URL.createObjectURL(image[0]);

  if (categories.length === 0) return null;
  else
    return (
      <Layout>
        <UserContainer>
          <div className="row m-0 p-0 pb-5">
            <div className="col-lg-2 col-sm-1" />
            <div className="col-lg-8 col-sm-10 d-flex flex-column align-items-center w-100">
              <div
                className="row m-0 mt-5 mb-4 display-4"
                style={{ fontSize: '3rem' }}>
                Create a new post
              </div>
              {image?.length ? (
                <div
                  className="row mx-1 my-1 w-100 mb-4"
                  style={{ height: '400px' }}>
                  <img
                    className="w-100 h-100"
                    src={imageSource()}
                    style={{ objectFit: 'cover' }}
                  />
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
              <Editor />
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
                <div className="w-25 d-flex">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addNewTag()}
                    style={{
                      borderTopRightRadius: '0',
                      borderBottomRightRadius: '0',
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
                <div className="col-2 ml-auto">
                  <Button danger type="text" size="large" block>
                    Cancel
                  </Button>
                </div>
                <div className="col-2 ml-2">
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleSave}
                    disabled={isButtonDisabled()}>
                    Publish
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-1" />
          </div>
        </UserContainer>
      </Layout>
    );
};

export default CreatePostEditor;
