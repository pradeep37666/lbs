import axios from 'axios'

const Instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 18000,
})

Instance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem('LBSToken')
  if (!token) return req
  req.headers.Authorization = `Bearer ${token}`
  return req
})

export const CometChatInstance = axios.create({
  baseURL: process.env.REACT_APP_CHAT_URL,
  timeout: 18000,
})

CometChatInstance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem('LBSToken')
  if (!token) return req
  req.headers.Authorization = `Bearer ${token}`
  return req
})

export default Instance
