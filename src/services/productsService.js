const URL = 'http://localhost:3001/products';

export const addProduct = async (product) => {
    const response = await fetch(`${URL}`, {
      method: 'POST',
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

export const getAllProductsCategoriesImagesByNameAndFilter = async (page = 1, pageSize = 10, name = '', filter = '') => {
    const response = await fetch(`${URL}/category/images/discounts?page=${page}&pageSize=${pageSize}&name=${name}&filter=${filter}`);
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

export const getTopProducts = async (limit, order, startDate, endDate) => {
    const response = await fetch(`${URL}/top?limit=${limit}&order=${order}&startdate=${startDate}&enddate=${endDate}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};