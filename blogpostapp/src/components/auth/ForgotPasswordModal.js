import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { sendResetLink } from '../../utils/apiCall';
import { message } from 'antd';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const cancel = () => {
    setEmail('');
    onClose();
  };

  const sendLink = () => {
    sendResetLink(email).then((response) => {
      if (response.error) message.error(response.error);
      else {
        message.success(response.message);
        cancel();
      }
    });
  };

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h3">
        Reset Password
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 4 }}>
        Enter Your Email. Password reset link will be sent to your email
        account.
      </Typography>
      <TextField
        className="mt-3"
        type="email"
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="mt-4 w-100 d-flex justify-content-end">
        <Button variant="text" color="error" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="contained" className="ml-4 mr-2" onClick={sendLink}>
          Send Link
        </Button>
      </div>
    </Box>
  );
};

export default ForgotPasswordModal;
