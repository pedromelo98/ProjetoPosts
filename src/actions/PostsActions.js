import * as PostsAPI from '../api/PostsAPI'

import * as Constants from '../utils/PostsConstants'


export const getAllPosts = () => {

    return dispatch => {
        PostsAPI.getAll()
            .then(posts => getAllSuccess(dispatch, posts))
    }

}

export const getAllSuccess = (dispatch, posts) => {
    dispatch(
        {
            type: Constants.GET_ALL,
            payload: posts
        }
    )
}

export const getByCategorie = (categorie) => {

    return dispatch => {
        PostsAPI.getPostByCategorie(categorie)
            .then(posts => getByCategorieSuccess(dispatch, posts))
    }

}

export const getByCategorieSuccess = (dispatch, posts) => {
    dispatch(
        {
            type: Constants.GET_ALL_BY_CATEGORIE,
            payload: posts
        }
    )
}

export const getById = (id) => {
    return dispatch => {
        PostsAPI.getPostById(id)
            .then(post => getByIdSuccess(dispatch, post))
    }

}

export const getByIdSuccess = (dispatch, post) => {
    dispatch(
        {
            type: Constants.GET_BY_ID,
            payload: post
        }
    )
}

export const changeBody = (body) => {
    return {
        type: Constants.CHANGE_BODY,
        payload: body
    }
}

export const changeTitle = (title) => {
    return {
        type: Constants.CHANGE_TITLE,
        payload: title
    }
}

export const changeCategorie = (category) => {
    return {
        type: Constants.CHANGE_CATEGORIE,
        payload: category
    }
}

export const changePost = (post) => {

    return {
        type: Constants.CHANGE_POST,
        payload: post
    }
}

export const changePostError = () => {
    return {
        type: Constants.POST_NOT_ADDED,
        payload: false
    }
}

export const addPost = (editpost, post) => {
    if (post.category === 'Selecione a categoria' || post.title === '' || post.body === '') {
        return {
            type: Constants.POST_NOT_ADDED,
            payload: true
        }
    }
    if (editpost.edit === true) {

        PostsAPI.editPost(editpost.id, { category: post.category, title: post.title, author: post.author, body: post.body, timestamp: editpost.timestamp })
        return {
            type: Constants.POST_ADDED,
            payload: false
        }
    }

    PostsAPI.addPost(post)
    return {
        type: Constants.POST_ADDED,
        payload: false
    }
}

export const deletePost = (id) => {

    return dispatch => {
        PostsAPI.deletePost(id)
            .then(success => deleteSuccess(dispatch))
    }


}

export const deleteSuccess = (dispatch) => {
    dispatch(
        {
            type: Constants.POST_DELETED,
            payload: true
        }
    )
}


export const votePost = (id, vote) => {

    // /*A função abaixo desses comentários não tem nenhum retorno ela apenas adiciona um voto para o post no seridor*/ console.log(PostsAPI.vote(id, vote)) /*retorna undefined*/
    // Acredito que para usar o dispatch eu precise de um retorno assim como o exemplo na correção do código:                                                       |
    /*export const fetchTodos = () => dispatch => (                                                                                                                 |
        Api.fetchTodos() //1.Chama a API                                                                                                                            |
                   \/                                                                                                                                               |
           .then(todos => dispatch({ //2. Só depois do retorno é que dispara o objeto                                                                               |
              |    type: RECEIVE_TODOS,                                                                                                                             |
              |    todos: todos                                                                                                                                     |
              |______________________________________TypeError: Cannot read property 'then' of undefined____________________________________________________________|
           })
     )*/

    PostsAPI.vote(id, vote)

    return {
        type: Constants.NEW_VOTE,
        payload: true
    }
}

export const changeAddPost = (boolean) => {

    return {
        type: Constants.POST_ADDED,
        payload: boolean
    }
}

export const changeTime = (timestamp) => {

    return {
        type: Constants.TIMESTAMP,
        payload: timestamp
    }
}

export const changeVote = (vote) => {

    return {
        type: Constants.VOTE,
        payload: vote
    }
}

export const changeId = (id) => {

    return {
        type: Constants.ID_ID,
        payload: id
    }
}

export const changeEditPost = (boolean) => {

    return {
        type: Constants.EDIT_POST,
        payload: boolean
    }
}

export const changeCategorieValue = (boolean) => {

    return {
        type: Constants.CHANGE_CATEGORIE_VALUE,
        payload: boolean
    }
}

export const newPost = (boolean) => {

    return {
        type: Constants.NEW_POST,
        payload: boolean
    }
}

export const changeOrientation = (orientation) => {
    return {
        type: Constants.CHANGE_ORIENTATION,
        payload: orientation
    }
}
