import * as CategoriesAPI from '../utils/CategoriesAPI'
import * as PostsAPI from '../utils/PostsAPI'


const INITIAL_STATE = {
    categories: CategoriesAPI.getAll(),
    subcategories: false,
    categorie: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'renderiza_sub':
            return { ...state, subcategories: action.payload }
            break
        case 'muda_categorie':
            return { ...state, categorie: action.payload }
            break
        default:
            return state

    }
}