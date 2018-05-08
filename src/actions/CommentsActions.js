import * as CommentsAPI from '../utils/CommentsAPI'
import * as Constants from '../utils/CommentsConstants'


export const getByParentId = (id) => {
    return dispatch => {
        CommentsAPI.getCommentById(id)
            .then(comments => getByParentIdSuccess(dispatch, comments))
    }
}

export const getByParentIdSuccess = (dispatch, comments) => {
    dispatch(
        {
            type: Constants.GET_COMMENTS_BY_PARENT,
            payload: comments
        }
    )
}

export const renderComments = (boolean) => {
    return {
        type: Constants.RENDER_COMMENTS,
        payload: boolean
    }
}

export const changeParentId = (id) => {
    return {
        type: Constants.CHANGE_PARENT_ID,
        payload: id
    }
}

export const changeOrientation = (orientation) => {
    return {
        type: Constants.CHANGE_COMMENTS_ORIENTATION,
        payload: orientation
    }
}

export const changeTa = (text) => {
    return {
        type: Constants.CHANGE_TA,
        payload: text
    }
}

export const changeEdit = (text) => {
    return {
        type: Constants.CHANGE_EDIT,
        payload: text
    }
}

export const voteComment = (id, vote) => {
    CommentsAPI.vote(id, vote)
    return {
        type: Constants.NEW_VOTE,
        payload: true
    }
}

export const addComment = (comment) => {

    return dispatch => {
        CommentsAPI.addComment(comment)
            .then(success => addCommentSuccess(dispatch, comment))
    }

}

export const addCommentSuccess = (dispatch, comment) => {
    dispatch(
        {
            type: Constants.ADD_COMMENT,
            payload: comment
        }
    )
}


export const deleteComment = (id) => {

    return dispatch => {
        CommentsAPI.deleteComment(id)
            .then(success => deleteSuccess(dispatch))
    }

}

export const deleteSuccess = (dispatch) => {
    dispatch(
        {
            type: Constants.NEW_COMMENT,
            payload: true
        }
    )
}

export const editComment = (id, comment) => {
    CommentsAPI.editComment(id, comment)
    return {
        type: Constants.EDIT_COMMENT,
        payload: true
    }
}

export const newComment = (boolean) => {
    return {
        type: Constants.NEW_COMMENT,
        payload: boolean
    }
}
