import { apiURL } from "./util";

const URL = apiURL + 'discounts';

export const getAllDiscounts = async () => {
    const response = await fetch(URL);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getDiscountsByValidity = async (validity) => {
    const response = await fetch(`${URL}?validity=${validity}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const addDiscount = async (discount) => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(discount)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const updateDiscount = async (discount) => {
    const response = await fetch(`${URL}/${discount.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(discount)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};
