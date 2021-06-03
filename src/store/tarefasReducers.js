import { http, headers } from '../services/api'

import { MostrarMensagem, AlterarSeverity } from './mensagensReducer'



const ACTIONS = {
    LISTAR: 'TAREFAS_LISTAR',
    ADD: 'TAREFAS_ADD',
    REMOVE: 'TAREFA_REMOVE',
    UPDATE_STATUS: 'TAREFA_UPDATE_STATUS'
}

const ESTADO_INICIAL = {
    tarefas: [],
    quantidade: 0,
}

export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
    switch (action.type) {
        case ACTIONS.LISTAR:
            return { ...state, tarefas: action.tarefas, quantidade: action.tarefas.length }
        case ACTIONS.ADD:
            const list = [...state.tarefas, action.tarefa]
            return { ...state, tarefas: list, quantidade: list.length} 
        case ACTIONS.REMOVE:
            const id = action.id
            const lista = state.tarefas.filter(tarefa => tarefa.id !== id) // retorna todas tarefas diferente do id da excluida
            return { ...state, tarefas: lista, quantidade: lista.length }
        case ACTIONS.UPDATE_STATUS:
            const listaAtualizada = [...state.tarefas]
            listaAtualizada.forEach(tarefa => {
                if (tarefa.id === action.id) {
                    tarefa.done = true
                }
            })
            return { ...state, tarefas: listaAtualizada } 
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
        }).catch(MostrarMensagem('Erro ao renderizar lista de tarefa!'), AlterarSeverity('error'))
    }
}

export function Salvar(tarefa) {

    return dispatch => {
        http.post('/tarefas', tarefa, {
            headers
        }).then(response => {
            dispatch([{
                type: ACTIONS.ADD,
                tarefa: response.data
            },
            MostrarMensagem('Tarefa salva com sucesso!'), AlterarSeverity('success')
            
            ])
        }).catch(response => console.log(response))
    }

}

export function Deletar(id) {
    return dispatch => {
        http.delete(`/tarefas/${id}`, {
            headers
        }).then(response => {
            dispatch([{
                type: ACTIONS.REMOVE,
                id: id
            },
            MostrarMensagem('Tarefa eliminada com sucesso!'), AlterarSeverity('success')
            ])
        }).catch(response => console.log(response))
    }
}

export function AlterarStatus(id) {
    return dispatch => {
        http.patch(`/tarefas/${id}`, null, {
            headers
        }).then(response => {
            dispatch([{
                type: ACTIONS.UPDATE_STATUS,
                id: id
            },
            MostrarMensagem('Tarefa aualizada com sucesso!'), AlterarSeverity('success')
            ])
        }).catch(response => console.log(response))
    }
}