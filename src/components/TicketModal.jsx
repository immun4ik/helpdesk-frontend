import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

export default function TicketModal({ open, onClose, onSave, ticket }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (ticket) {
            setName(ticket.name || '');
            setDescription(ticket.description || '');
            setStatus(ticket.status || false);
        } else {
            setName('');
            setDescription('');
            setStatus(false);
        }
    }, [ticket]);

    const handleSubmit = () => {
        if (!name.trim() || !description.trim()) {
            alert('Enter ticket name and description');
            return;
        }
        onSave({ ...ticket, name, description, status });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}><Typography variant="h6" component="h2" mb={2}>
                {ticket ? 'Edit ticket' : 'Add new ticket'}
            </Typography>

                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <FormControlLabel
                    control={<Checkbox checked={status} onChange={e => setStatus(e.target.checked)} />}
                    label="Done"
                />

                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Save</Button>
                </Box>
            </Box>
        </Modal>
    );
}