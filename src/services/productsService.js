const URL = 'http://localhost:3001/products';

export const getAllProducts = async () => {
    const response = await fetch(URL);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getProductsByNameFilter = async (name) => {
    const response = await fetch(`${URL}?name=${name}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAllProductsCategoriesImagesDiscounts = async () => {
    const response = await fetch(`${URL}/category/images/discounts`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAllProductsCategoriesImagesDiscountsByNameAndFilter = async (name, filter) => {
    const response = await fetch(`${URL}/category/images/discounts?name=${name}&filter=${filter}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getProductById = async (id) => {
    const response = await fetch(`${URL}/${id}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
}

export const getProductCategoryImagesDiscountsById = async (id) => {
    const response = await fetch(`${URL}/category/images/discounts/${id}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const updateProduct = async (product) => {
    const response = await fetch(`${URL}/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(product)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getTopProducts = async (limit, order) => {
    const response = await fetch(`${URL}/top?limit=${limit}&order=${order}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};