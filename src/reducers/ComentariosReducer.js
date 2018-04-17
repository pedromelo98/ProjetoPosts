
const INITIAL_STATE = {
    visible: false,
    idDoPai: '',
    ta: '',
    novo_Comentario: false,
    edit: '',
    ordemcomentarios: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'renderiza_comentarios':
            return { ...state, visible: action.payload }
        case 'muda_id_pai':
            return { ...state, idDoPai: action.payload }
        case 'muda_ta':
            return { ...state, ta: action.payload }
        case 'muda_edit':
            return { ...state, edit: action.payload }
        case 'muda_comentarios_ordem':
            return { ...state, ordemcomentarios: action.payload }
        case 'novo_comentario':
            return { ...state, novo_Comentario: action.payload }
        default:
            return state

    }
}