import api from './api';

export async function listarProdutos() {
    const response = await api.get('/products');
    return response.data.products;
}

export async function buscarProdutoPorId(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export async function pesquisarProdutos(nome) {
    const response = await api.get('/products/search', {
        params: {
            q: nome,
        },
    });
    return response.data.products;
}