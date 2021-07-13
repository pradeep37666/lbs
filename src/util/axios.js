import axios from "axios";

const instance = axios.create({
    baseURL: 'http://3.25.238.3:3000/',
    timeout: 3000,
})

export default instance