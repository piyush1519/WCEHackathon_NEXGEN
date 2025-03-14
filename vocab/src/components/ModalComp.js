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
        margin: '5px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxHeight: '700px',
        maxWidth,
        bgcolor: '#F6F7FC',
        boxShadow: 24,
        borderRadius: '10px',
        overflow: "scroll",
        p: 4,
        gap: 6,
        zIndex: 1400, // Ensure the box content is above the modal backdrop
      }}
    >
      {children}
    </Box>
  </Modal>
);

export default ModalComponent;
