import axios from 'axios'

const APL_URL = '/api/tickets/'

//create New Ticket

const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = axios.post(APL_URL, ticketData, config)

    console.log(ticketData);

    return response.data

}

//Get user ticket

const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = axios.get(APL_URL, config)

    return response.data
}


const ticketService = {
    createTicket,
    getTickets
}

export default ticketService