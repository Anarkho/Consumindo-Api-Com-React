import {http, headers} from '../services/api'



const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVE: 'TAREFA_REMOVE'
}

const ESTADO_INICIAL = {
    tarefas : []
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return { ...state, tarefas: action.tarefas }
        default:
            return state
    }
}

export function Listar(){
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