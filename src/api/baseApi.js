import axios from 'axios';
import { async } from 'q';
import {getToken} from './Auth/index.js'

export const baseUrl = "http://127.0.0.1:8080"
export const api = axios.create({
    baseURL:baseUrl
})
