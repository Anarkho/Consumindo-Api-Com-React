import { http, headers } from '../services/api'



const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVE: 'TAREFA_REMOVE'
}

const ESTADO_INICIAL = {
    tarefas: []
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return { ...state, tarefas: action.tarefas }
        case ACTIONS.ADD:
            return { ...state, tarefas: [...state.tarefas, action.tarefa] }
        case ACTIONS.REMOVE:
            const id = action.id
            const lista = state.tarefas.filter(tarefa => tarefa.id !== id) // retorna todas tarefas diferente do id da excluida
            return {...state, tarefas: lista}
        default:
            return state
    }
}

export function Listar() {
    return dispatch => {

        http.get('/tarefas', {
            headers
        }).then(response => {
            dispatch({
                type: ACTIONS.LISTAR,
                tarefas: response.data
            })
        })
    }
}

export function Salvar(tarefa) {

    return dispatch => {
        http.post('/tarefas', tarefa, {
            headers
        }).then(response => {
            dispatch({
                type: ACTIONS.ADD,
                tarefa: response.data
            })
        })
    }
    
}

export function Deletar(id) {
    return dispatch => {
        http.delete(`/tarefas/${id}`, {
            headers
        }).then(response => {
            dispatch({
                type: ACTIONS.REMOVE,
                id: id
            })
        })
    }
}