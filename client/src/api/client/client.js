import axios from 'axios'

const client = axios.create({
    withCredantials: true
})

export default client