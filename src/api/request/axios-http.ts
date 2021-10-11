import axios from "axios";

const devBaseUrl = "http://127.0.0.1:8080/zplay/api"
const mockBaseUrl = "http://127.0.0.1:3000/api"

export const client = axios.create({
    baseURL: devBaseUrl,
    timeout: 10000,
    withCredentials: true
})

export interface Result<T> {
    code: Number,
    msg: String,
    data: T
}

