import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';

const UploadImage = ({ image, setImage }) => {
  const props = {
    onRemove: () => {
      setImage([]);
    },
    beforeUpload: (file) => {
      setImage([file]);
      return false;
    },
    fileList: image,
  };

  return (
    <React.Fragment>
      <Upload {...props}>
        <Button icon={<UploadOutlined />} className="d-flex align-items-center">
          Upload Image
        </Button>
      </Upload>
    </React.Fragment>
  );
};

export default UploadImage;
