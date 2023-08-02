import axios from 'axios';

export default axios.create({
    baseURL: 'https://dummyjson.com/',

    headers: {
        'Content-type': 'application/json',
    },
});
