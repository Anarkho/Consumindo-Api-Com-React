import {combineReducers} from 'redux'
import {tarefaReducer} from 'store/tarefasReducers'


const mainReducer = combineReducers({
    Tarefas: tarefaReducer
})

export default mainReducer