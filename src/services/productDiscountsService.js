import { apiURL } from "./util";

const URL = apiURL + 'productDiscounts';

export const addProductDiscount = async (productDiscount) => {
    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(productDiscount)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const updateProductDiscount = async (productDiscount) => {
    const response = await fetch(`${URL}/${productDiscount.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(productDiscount)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const deleteProductDiscount = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};