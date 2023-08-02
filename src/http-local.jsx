import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://64ae8f86c85640541d4d49fc.mockapi.io/api/',

    headers: {
        'Content-type': 'application/json',
    },
});
