import axios from 'axios'

const API_URL = '/api/tickets/'

//Get ticket Notes

const getNotes = async (tickedId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + tickedId + '/notes', config)

    return response.data
}

const noteService = {
    getNotes
}

export default noteService