
const ESTADO_INICIAL = {
    mensagem: '',
    mostrarMensagem: false,
    informa: false,
    severity: ''
}
export const ACTIONS = {
    MOSTRAR_MENSAGEM: 'MENSAGENS_MOSTRAR',
    ESCONDER_MENSAGEM: 'MENSAGENS_ESCONDER',
    ALTERAR_SEVERITY: 'MENSAGENS_SEVERITY'
}

export function mensagemReducer(state = ESTADO_INICIAL, action) {
    switch (action.type) {
        case ACTIONS.MOSTRAR_MENSAGEM:
            return {
                ...state, mensagem: action.mensagem, mostrarMensagem: true, 
                informa: true, AlterarSeverity
            }
        case ACTIONS.ESCONDER_MENSAGEM:
            return {
                ...state, mensagem: '', mostrarMensagem: false, informa: false
            }
        case ACTIONS.ALTERAR_SEVERITY:
            return {...state, severity: action.severity}
        default:
            return state 
    }
}

export function MostrarMensagem(mensagem) {
    return {
        type: ACTIONS.MOSTRAR_MENSAGEM,
        mensagem: mensagem
    }
}

export function EsconderMensagem(mensagm) {
    return {
        type: ACTIONS.ESCONDER_MENSAGEM
    }
}

export function AlterarSeverity(tipo){
    return {
        type: ACTIONS.ALTERAR_SEVERITY,
        severity: tipo
    }
}