import * as Constants from '../utils/CommentsConstants'

const INITIAL_STATE = {
    comments: '',
    visible: false,
    parentId: '',
    ta: '',
    newComment: false,
    edit: '',
    filterComments: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constants.GET_COMMENTS_BY_PARENT:
            return { ...state, comments: action.payload }
        case Constants.RENDER_COMMENTS:
            return { ...state, visible: action.payload }
        case Constants.CHANGE_PARENT_ID:
            return { ...state, parentId: action.payload }
        case Constants.CHANGE_TA:
            return { ...state, ta: action.payload }
        case Constants.CHANGE_EDIT:
            return { ...state, edit: action.payload }
        case Constants.CHANGE_COMMENTS_ORIENTATION:
            return { ...state, filterComments: action.payload }
        case Constants.NEW_COMMENT:
            return { ...state, newComment: action.payload }
        default:
            return state

    }
}