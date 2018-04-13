import { combineReducers } from 'redux'
import CategoriesReducer from './CategoriesReducer'
import ComentariosReducer from './ComentariosReducer'
import PostsReducer from './PostsReducer';

export default combineReducers({
    CategoriesReducer, ComentariosReducer, PostsReducer
})