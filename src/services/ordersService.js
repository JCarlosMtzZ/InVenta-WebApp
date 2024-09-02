import { apiURL } from "./util";

const URL = apiURL + 'orders';

export const addOrder = async (adminId) => {
    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          date: new Date(),
          adminId: adminId
        })
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

//export const getOrdersGroupedByMonth = async () => {
//    const response = await fetch(`${URL}/grouped/month`);
//    if (!response.ok)
//        throw new Error(await response.text());
//    return response.json();
//};

export const getOrdersDateRange = async () => {
    const response = await fetch(`${URL}/dateRange`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};