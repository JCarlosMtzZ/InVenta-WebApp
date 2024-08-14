const URL = 'http://localhost:3001/products';

export const getAllProducts = async () => {
    const response = await fetch(URL);
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