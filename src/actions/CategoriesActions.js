import * as CategoriesAPI from '../utils/CategoriesAPI'

export const renderizaSubCategorie = (boolean) => {
    return {
        type: 'renderiza_sub',
        payload: boolean
    }
}

export const mudaCategorie = (texto) => {
    return {
        type: 'muda_categorie',
        payload: texto
    }
}
//Fazer
export const populaCategories = () => {
    return {
        type: 'popula_categorie',
        payload: ''
    }
}
