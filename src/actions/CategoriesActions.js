import * as Constants from '../utils/CategoriesConstants'

export const renderChildCategorie = (boolean) => {
    return {
        type: Constants.RENDER_CHILD,
        payload: boolean
    }
}

export const changeCategory = (text) => {
    return {
        type: Constants.CHANGE_CATEGORY,
        payload: text
    }
}


export const setCategories = () => {
    return {
        type: Constants.SET_CATEGORIES,
        payload: ''
    }
}
