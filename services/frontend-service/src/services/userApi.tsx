import axios from 'axios';

const userApi = axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL || 'http://localhost:4002',
    withCredentials: true,
})

export default userApi;