import * as Constants from '../utils/CategoriesConstants'


const INITIAL_STATE = {
    categories: [],
    childcategories: false,
    category: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constants.GET_ALL:
            return { ...state, categories: action.payload }
        case Constants.RENDER_CHILD:
            return { ...state, childcategories: action.payload }
        case Constants.CHANGE_CATEGORY:
            return { ...state, category: action.payload }
        default:
            return state

    }
}