import axios from "axios";

const Instance = axios.create({
    baseURL: 'http://54.79.152.215:3000/',
    timeout: 18000,
})

Instance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('LBSToken')
    if (!token) return req
    req.headers.Authorization = `Bearer ${token}`
    return req
})

export const CometChatInstance = axios.create({
    baseURL: 'https://192491b43d1b6230.api-US.cometchat.io/v3.0',
    timeout: 18000,
})

CometChatInstance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('LBSToken')
    if (!token) return req
    req.headers.Authorization = `Bearer ${token}`
    return req
})

export default Instance