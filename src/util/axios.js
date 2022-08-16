import axios from "axios";

const Instance = axios.create({
    baseURL: 'https://dev.littlebigsocial.com',
    timeout: 18000,
})

Instance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('LBSToken')
    if (!token) return req
    req.headers.Authorization = `Bearer ${token}`
    return req
})

export const CometChatInstance = axios.create({
    baseURL: 'https://2150790c311594db.api-US.cometchat.io/v3.0',
    timeout: 18000,
})

CometChatInstance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem('LBSToken')
    if (!token) return req
    req.headers.Authorization = `Bearer ${token}`
    return req
})

export default Instance