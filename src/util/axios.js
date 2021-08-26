import axios from "axios";

const Instance = axios.create({
    baseURL: 'http://3.25.238.3:3000/',
    timeout: 3000,
})

Instance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('token')
    if (!token) return req
    req.headers.Authorization = `Bearer ${token}`
    return req
})

export default Instance