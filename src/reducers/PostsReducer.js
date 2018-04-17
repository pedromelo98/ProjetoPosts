import * as Constantes from '../utils/PostsConstantes'

const INITIAL_STATE = {
    novopost: false,
    post: '',
    body: '',
    title: '',
    id: '',
    category: '',
    timestamp: '',
    addpost: false,
    editpost: false,
    valuecategoria: 'Selecione a categoria',
    voteScore: '',
    ordenar: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constantes.MUDA_CATEGORY:
            return { ...state, category: action.payload }
        case Constantes.MUDA_TITLE:
            return { ...state, title: action.payload }
        case Constantes.MUDA_BODY:
            return { ...state, body: action.payload }
        case Constantes.MUDA_POST:
            return { ...state, post: action.payload }
        case Constantes.POST_ADICIONADO:
            return { ...state, addpost: action.payload, novopost: !action.payload }
        case Constantes.NOVO_POST:
            return { ...state, novopost: action.payload }
        case Constantes.EDIT_POST:
            return { ...state, editpost: action.payload }
        case Constantes.MUDA_VALUECATEGORIA:
            return { ...state, valuecategoria: action.payload }
        case Constantes.ID_ID:
            return { ...state, id: action.payload }
        case Constantes.TIMESTAMP:
            return { ...state, timestamp: action.payload }
        case Constantes.VOTE:
            return { ...state, voteScore: action.payload }
        case Constantes.MUDA_ORDEM:
            return { ...state, ordenar: action.payload }
        default:
            return state

    }
}