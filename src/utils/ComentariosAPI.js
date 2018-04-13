const api = 'http://localhost:3001'

let token = '6b5uhtxi'

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getComentarioPorId = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(comments => comments)

export const addComentario = (comentario) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comentario)
  })
    .then(res => res)

export const votar = (id, option) => {
  let voto = { option }
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(voto)
  })
    .then(res => res)
}

export const deletarComentario = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
    .then(res => res)

export const editarComentario = (id, comentario) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comentario)
  })
    .then(res => res)