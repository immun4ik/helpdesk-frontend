import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function TicketItem({ ticket, onToggleStatus, onEdit, onDelete, onView }) {
    const { id, name, status } = ticket;

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '10px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
        }}>
            <div onClick={() => onView(id)} style={{ flexGrow: 1 }}>
                <strong>{name}</strong>
            </div>

            <button title={status ? 'Mark as not done' : 'Mark as done'} onClick={e => { e.stopPropagation(); onToggleStatus(id, !status); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {status ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
            </button>

            <button title="Edit" onClick={e => { e.stopPropagation(); onEdit(id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8 }}>
                <EditIcon />
            </button>

            <button title="Delete" onClick={e => { e.stopPropagation(); onDelete(id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8 }}>
                <DeleteIcon color="error" />
            </button>
        </div>
    );
}