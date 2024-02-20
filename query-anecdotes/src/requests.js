import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createNote = newNote =>
    axios.post(baseUrl, newNote)
        .then(res => res.data)


export const castVote = vote =>
    axios.put(`${baseUrl}/${vote.id}`, vote).then(res => res.data)