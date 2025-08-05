import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

async function apiRequest(method, data = {}) {
    const config = {
        method: data ? 'POST' : 'GET',
        url: API_URL,
        params: { method },
        data,
    };
    if (method === 'allTickets' || method === 'ticketById') {
        config.method = 'GET';
        delete config.data;
    }
    const response = await axios(config);
    return response.data;
}

export async function getAllTickets() {
    return apiRequest('allTickets');
}

export async function getTicketById(id) {
    return apiRequest('ticketById', { id });
}

export async function createTicket(ticket) {
    return apiRequest('createTicket', ticket);
}


export async function deleteTicket(id) {
    return apiRequest('deleteTicket', { id });
}

export async function editTicket(ticket) {
    return apiRequest('editTicket', ticket);
}

export async function setStatusTicket(id, status) {
    return apiRequest('setStatusTicket', { id, status });
}