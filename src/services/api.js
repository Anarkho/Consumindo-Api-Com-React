import axios from 'axios'

export const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})
 
export const headers = { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }

