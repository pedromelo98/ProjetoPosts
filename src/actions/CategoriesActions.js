import * as Constants from '../utils/CategoriesConstants'
import * as CategoriesAPI from '../api/CategoriesAPI'


export const getCategories = () => {
    return dispatch => {
        CategoriesAPI.getAll()
            .then(categories => getAllSuccess(dispatch, categories))
    }
}

export const getAllSuccess = (dispatch, categories) => {
    dispatch(
        {
            type: Constants.GET_ALL,
            payload: categories
        }
    )
}

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
