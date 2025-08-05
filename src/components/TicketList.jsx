import React from 'react';
import TicketItem from './TicketItem';

export default function TicketList({ tickets, onToggleStatus, onEdit, onDelete, onView }) {
    if (!tickets.length) return <p>Ticket list is empty</p>;

    return (
        <>
            {tickets.map(ticket => (
                <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                />
            ))}
        </>
    );
}