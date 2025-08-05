import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TicketList from './components/TicketList';
import TicketModal from './components/TicketModal';
import ConfirmModal from './components/ConfirmModal';
import Loader from './components/Loader';

import { getAllTickets, createTicket, deleteTicket, editTicket, setStatusTicket } from './api';

function App() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [viewingTicketId, setViewingTicketId] = useState(null);
    const [viewingDescription, setViewingDescription] = useState('');

    // «агрузка тикетов с сервера
    const loadTickets = async () => {
        try {
            setLoading(true);
            const data = await getAllTickets();
            setTickets(data);
        } catch (e) {
            console.error(e);
            alert('Error loading ticket details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    // —оздать или отредактировать тикет
    const handleSaveTicket = async (ticket) => {
        try {
            setLoading(true);
            if (ticket.id) {
                // редактируем
                await editTicket(ticket);
            } else {
                // создаем новый
                await createTicket(ticket);
            }
            await loadTickets();
        } catch (e) {
            console.error(e);
            alert('Error saving ticket');
        } finally {
            setLoading(false);
        }
        setEditingTicket(null);
        setModalOpen(false);
    };

    // ”даление тикета
    const handleDeleteTicket = async () => {
        if (!deletingId) return;
        try {
            setLoading(true);
            await deleteTicket(deletingId);
            await loadTickets();
        } catch (e) {
            console.error(e);
            alert('Error deleting ticket');
        } finally {
            setLoading(false);
            setDeletingId(null);
            setConfirmOpen(false);
        }
    };
    const handleToggleStatus = async (id, newStatus) => {
        try {
            setLoading(true);
            await setStatusTicket(id, newStatus);
            await loadTickets();
        } catch (e) {
            console.error(e);
            alert('Error updating status');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (id) => {
    try {
        setLoading(true);
        const { getTicketById } = await import('./api');
        const full = await getTicketById(id);

        setViewingDescription(full.description || '');
        setViewingTicketId(id);
    } catch (e) {
        console.error(e);
        alert('Error loading ticket details');
    } finally {
        setLoading(false);
    }
};



    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>HelpDesk - List of tickets</Typography>

            <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => { setEditingTicket(null); setModalOpen(true); }}>
                Add ticket
            </Button>

            {loading && <Loader />}

            <TicketList
                tickets={tickets}
                onToggleStatus={handleToggleStatus}
                onEdit={(id) => {
                    const t = tickets.find(t => t.id === id);
                    setEditingTicket(t);
                    setModalOpen(true);
                }}
                onDelete={(id) => { setDeletingId(id); setConfirmOpen(true); }}
                onView={(id) => handleViewDetails(id)}
            />

            {/* ћодальное окно создани€/редактировани€ */}
            <TicketModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveTicket} ticket={editingTicket} />

            {/* ћодальное окно подтверждени€ удалени€ */}
            <ConfirmModal open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDeleteTicket} message="Are you sure you want to delete this ticket?" />

            {/* ћодальное окно просмотра описани€ */}
            {viewingTicketId && (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
                    <Typography variant="h6">Ticket Description</Typography>
                    <Typography>{viewingDescription}</Typography>
                    <Button sx={{ mt: 2 }} variant="outlined" onClick={() => { setViewingTicketId(null); setViewingDescription(''); }}>Close</Button>
                </div>
            )}

        </Container>
    );
}

export default App;
