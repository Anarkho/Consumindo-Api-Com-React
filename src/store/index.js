import {combineReducers} from 'redux'
import {tarefaReducer} from 'store/tarefasReducers'
import {mensagemReducer} from 'store/mensagensReducer'


const mainReducer = combineReducers({
    Tarefas: tarefaReducer,
    Mensagens: mensagemReducer
})

export default mainReducer