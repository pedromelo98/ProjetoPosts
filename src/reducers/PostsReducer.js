import * as PostsAPI from '../utils/PostsAPI'


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
        case 'muda_category':
            return { ...state, category: action.payload }
            break
        case 'muda_title':
            return { ...state, title: action.payload }
            break
        case 'muda_body':
            return { ...state, body: action.payload }
            break
        case 'muda_post':
            return { ...state, post: action.payload }
            break
        case 'post_adicionado':
            return { ...state, addpost: action.payload, novopost: !action.payload }
            break
        case 'novo_post':
            return { ...state, novopost: action.payload }
            break
        case 'edit_post':
            return { ...state, editpost: action.payload }
            break
        case 'muda_valuecategoria':
            return { ...state, valuecategoria: action.payload }
            break
        case 'id_id':
            return { ...state, id: action.payload }
            break
        case 'timestamp':
            return { ...state, timestamp: action.payload }
            break
        case 'vote':
            return { ...state, voteScore: action.payload }
            break
        case 'muda_ordem':
            return { ...state, ordenar: action.payload }
            break
        default:
            return state

    }
}