import axios from "axios";

const Instance = axios.create({
    baseURL: 'http://54.79.152.215:3000/',
    timeout: 18000,
})

Instance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('token')
    if (!token) return req
    req.headers.Authorization = `Bearer ${token}`
    return req
})

export default Instance