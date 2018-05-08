import * as Constants from '../utils/PostsConstants'
import * as CommentConsts from '../utils/CommentsConstants'

const INITIAL_STATE = {
    posts: '',
    newpost: false,
    post: '',
    body: '',
    title: '',
    id: '',
    category: '',
    timestamp: '',
    addpost: false,
    editpost: false,
    categorieValue: 'Selecione a categoria',
    voteScore: '',
    filter: '',
    postError: false,
    postbyid: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CommentConsts.ADD_COMMENT:
            return { ...state, newpost: true }
        case Constants.GET_BY_ID:
            return { ...state, postbyid: action.payload }
        case CommentConsts.NEW_COMMENT:
            return { ...state, newpost: true }
        case Constants.GET_ALL:
            return { ...state, posts: action.payload, newpost: false }
        case Constants.GET_ALL_BY_CATEGORIE:
            return { ...state, posts: action.payload, newpost: false }
        case Constants.CHANGE_CATEGORIE:
            return { ...state, category: action.payload }
        case Constants.CHANGE_TITLE:
            return { ...state, title: action.payload }
        case Constants.CHANGE_BODY:
            return { ...state, body: action.payload }
        case Constants.CHANGE_POST:
            return { ...state, post: action.payload }
        case Constants.POST_ADDED:
            return { ...state, addpost: action.payload, newpost: !action.payload }
        case Constants.POST_NOT_ADDED:
            return { ...state, postError: action.payload }
        case Constants.NEW_POST:
            return { ...state, newpost: action.payload }
        case Constants.NEW_VOTE:
            return { ...state, newpost: action.payload }
        case Constants.POST_DELETED:
            return { ...state, newpost: action.payload }
        case Constants.EDIT_POST:
            return { ...state, editpost: action.payload }
        case Constants.CHANGE_CATEGORIE_VALUE:
            return { ...state, categorieValue: action.payload }
        case Constants.ID_ID:
            return { ...state, id: action.payload }
        case Constants.TIMESTAMP:
            return { ...state, timestamp: action.payload }
        case Constants.VOTE:
            return { ...state, voteScore: action.payload }
        case Constants.CHANGE_ORIENTATION:
            return { ...state, filter: action.payload }
        default:
            return state

    }
}