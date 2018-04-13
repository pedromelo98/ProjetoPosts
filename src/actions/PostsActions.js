import * as PostsAPI from '../utils/PostsAPI'

export const mudaBody = (body) => {
    return {
        type: 'muda_body',
        payload: body
    }
}

export const mudaTitle = (title) => {
    return {
        type: 'muda_title',
        payload: title
    }
}

export const mudaCategory = (category) => {
    return {
        type: 'muda_category',
        payload: category
    }
}

export const mudaPost = (post) => {

    return {
        type: 'muda_post',
        payload: post
    }
}

export const addPost = (editpost, post) => {
    if (post.category === 'Selecione a categoria' || post.title === '' || post.body === '') {
        alert('Erro, todos os campos são obrigatórios!')
        return {
            type: 'post_adicionado',
            payload: true
        }
    }
    if (editpost.edit === true) {

        PostsAPI.editarPost(editpost.id, { category: post.category, title: post.title, author: post.author, body: post.body, timestamp: editpost.timestamp })
        return {
            type: 'post_adicionado',
            payload: false
        }
    }

    PostsAPI.addPost(post)
    return {
        type: 'post_adicionado',
        payload: false
    }
}

export const deletarPost = (id) => {

    PostsAPI.deletarPost(id)

    return {
        type: 'post_deletado',
        payload: true
    }
}


export const votarPost = (id, voto) => {

    PostsAPI.votar(id, voto)

    return {
        type: 'novo_voto',
        payload: true
    }
}

export const mudaAddPost = (boolean) => {

    return {
        type: 'post_adicionado',
        payload: boolean
    }
}

export const mudaTime = (timestamp) => {

    return {
        type: 'timestamp',
        payload: timestamp
    }
}

export const mudaVote = (vote) => {

    return {
        type: 'vote',
        payload: vote
    }
}

export const mudaId = (id) => {

    return {
        type: 'id_id',
        payload: id
    }
}

export const mudaEditPost = (boolean) => {

    return {
        type: 'edit_post',
        payload: boolean
    }
}

export const mudaValueCategoria = (boolean) => {

    return {
        type: 'muda_valuecategoria',
        payload: boolean
    }
}

export const novoPost = (boolean) => {

    return {
        type: 'novo_post',
        payload: boolean
    }
}

export const mudaOrdenados = (ordem) => {
    return {
        type: 'muda_ordem',
        payload: ordem
    }
}
