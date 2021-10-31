import axios from 'axios';
import { async } from 'q';
import {getToken} from './Auth/index.js'

const SANDBOX = true;

export const baseUrl =  (SANDBOX == true) ? "http://1.josepedro.tmp.k8.com.br/api" : '';///api
export const api = axios.create({
    baseURL:baseUrl
})
