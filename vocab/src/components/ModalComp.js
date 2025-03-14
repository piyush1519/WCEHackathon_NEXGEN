import React from 'react';
import { Box, Modal } from '@mui/material';

const ModalComponent = ({ open, onClose, children, maxWidth = '600px' }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    sx={{
      zIndex: 1300, // Ensure modal appears above other elements
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '95%',
        maxWidth,
        bgcolor: '#F6F7FC',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
        zIndex: 1400, // Ensure the box content is above the modal backdrop
      }}
    >
      {children}
    </Box>
  </Modal>
);

export default ModalComponent;
