import { combineReducers } from 'redux'
import CategoriesReducer from './CategoriesReducer'
import CommentsReducer from './CommentsReducer'
import PostsReducer from './PostsReducer';

export default combineReducers({
    CategoriesReducer, CommentsReducer, PostsReducer
})