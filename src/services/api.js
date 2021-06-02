import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://minhastarefas-api.herokuapp.com'
})
 
export const headers = { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }

