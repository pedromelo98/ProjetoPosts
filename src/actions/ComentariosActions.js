import * as ComentariosAPI from '../utils/ComentariosAPI'


export const renderizaComentarios = (boolean) => {
    return {
        type: 'renderiza_comentarios',
        payload: boolean
    }
}

export const mudaIdDoPai = (id) => {
    return {
        type: 'muda_id_pai',
        payload: id
    }
}

export const mudaOrdenados = (ordem) => {
    return {
        type: 'muda_comentarios_ordem',
        payload: ordem
    }
}

export const mudaTa = (texto) => {
    return {
        type: 'muda_ta',
        payload: texto
    }
}

export const mudaEdit = (texto) => {
    return {
        type: 'muda_edit',
        payload: texto
    }
}

export const votarComentario = (id, voto) => {
    ComentariosAPI.votar(id, voto)
    return {
        type: 'novo_voto',
        payload: true
    }
}

export const addComentario = (comentario) => {
    ComentariosAPI.addComentario(comentario)
    return {
        type: 'add_comentario',
        payload: comentario
    }
}

export const deletarComentario = (id) => {
    ComentariosAPI.deletarComentario(id)
    return {
        type: 'novo_comentario',
        payload: true
    }
}

export const editarComentario = (id, comentario) => {
    ComentariosAPI.editarComentario(id, comentario)
    return {
        type: 'editar_comentario',
        payload: true
    }
}

export const novoComentario = (boolean) => {
    return {
        type: 'novo_comentario',
        payload: boolean
    }
}
