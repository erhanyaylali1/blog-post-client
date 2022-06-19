import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';

const UploadImage = ({ image, setImage, shape, icon, no_text }) => {
  const props = {
    onRemove: () => {
      setImage([]);
    },
    beforeUpload: (file) => {
      setImage([file]);
      return false;
    },
    fileList: image,
    showUploadList: no_text ? false : true,
  };

  return (
    <React.Fragment>
      <Upload {...props}>
        <Button
          shape={shape ? shape : 'default'}
          icon={icon ? icon : <UploadOutlined />}
          className={`${no_text ? '' : 'd-flex align-items-center'}`}>
          {no_text ? '' : 'Upload Image'}
        </Button>
      </Upload>
    </React.Fragment>
  );
};

export default UploadImage;
