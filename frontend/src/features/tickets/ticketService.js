import axios from 'axios'

const API_URL = '/api/tickets/'

//create New Ticket

const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)

    console.log(ticketData);

    return response.data

}

//Get user tickets

const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//Get user ticket

const getTicket = async (tickedId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + tickedId, config)

    return response.data
}

//Close ticket
const closeTicket = async (tickedId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + tickedId, { status: 'closed' }, config)

    return response.data
}


const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}

export default ticketService