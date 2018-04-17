import * as PostsAPI from '../utils/PostsAPI'

import * as Constantes from '../utils/PostsConstantes'

export const mudaBody = (body) => {
    return {
        type: Constantes.MUDA_BODY,
        payload: body
    }
}

export const mudaTitle = (title) => {
    return {
        type: Constantes.MUDA_TITLE,
        payload: title
    }
}

export const mudaCategory = (category) => {
    return {
        type: Constantes.MUDA_CATEGORY,
        payload: category
    }
}

export const mudaPost = (post) => {

    return {
        type: Constantes.MUDA_POST,
        payload: post
    }
}

export const addPost = (editpost, post) => {
    if (post.category === 'Selecione a categoria' || post.title === '' || post.body === '') {
        alert('Erro, todos os campos são obrigatórios!')
        return {
            type: Constantes.POST_ADICIONADO,
            payload: true
        }
    }
    if (editpost.edit === true) {

        PostsAPI.editarPost(editpost.id, { category: post.category, title: post.title, author: post.author, body: post.body, timestamp: editpost.timestamp })
        return {
            type: Constantes.POST_ADICIONADO,
            payload: false
        }
    }

    PostsAPI.addPost(post)
    return {
        type: Constantes.POST_ADICIONADO,
        payload: false
    }
}

export const deletarPost = (id) => {

    PostsAPI.deletarPost(id)

    return {
        type: Constantes.POST_DELETADO,
        payload: true
    }
}


export const votarPost = (id, voto) => {

    PostsAPI.votar(id, voto)

    return {
        type: Constantes.NOVO_VOTO,
        payload: true
    }
}

export const mudaAddPost = (boolean) => {

    return {
        type: Constantes.POST_ADICIONADO,
        payload: boolean
    }
}

export const mudaTime = (timestamp) => {

    return {
        type: Constantes.TIMESTAMP,
        payload: timestamp
    }
}

export const mudaVote = (vote) => {

    return {
        type: Constantes.VOTE,
        payload: vote
    }
}

export const mudaId = (id) => {

    return {
        type: Constantes.ID_ID,
        payload: id
    }
}

export const mudaEditPost = (boolean) => {

    return {
        type: Constantes.EDIT_POST,
        payload: boolean
    }
}

export const mudaValueCategoria = (boolean) => {

    return {
        type: Constantes.MUDA_VALUECATEGORIA,
        payload: boolean
    }
}

export const novoPost = (boolean) => {

    return {
        type: Constantes.NOVO_POST,
        payload: boolean
    }
}

export const mudaOrdenados = (ordem) => {
    return {
        type: Constantes.MUDA_ORDEM,
        payload: ordem
    }
}
