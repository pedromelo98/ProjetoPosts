import * as CategoriesAPI from '../utils/CategoriesAPI'
import * as Constants from '../utils/CategoriesConstants'


const INITIAL_STATE = {
    categories: CategoriesAPI.getAll(),
    childcategories: false,
    category: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constants.RENDER_CHILD:
            return { ...state, childcategories: action.payload }
        case Constants.CHANGE_CATEGORY:
            return { ...state, category: action.payload }
        default:
            return state

    }
}