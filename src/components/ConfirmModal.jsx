import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
};

export default function ConfirmModal({ open, onClose, onConfirm, message }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" mb={2}>{message}</Typography>

                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={() => { onConfirm(); onClose(); }}>Delete</Button>
                </Box>
            </Box>
        </Modal>
    );
}