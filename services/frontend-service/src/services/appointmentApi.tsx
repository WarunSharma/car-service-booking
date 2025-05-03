import axios from 'axios';

const appointmentApi = axios.create({
    baseURL: import.meta.env.VITE_APPOINTMENT_API_URL || 'http://localhost:4001',
    withCredentials: true,
})

export default appointmentApi;