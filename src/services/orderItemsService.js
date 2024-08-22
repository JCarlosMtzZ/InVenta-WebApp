const URL = 'http://localhost:3001/orderItems';

export const getOrderItemsSummary = async () => {
    const response = await fetch(`${URL}/summary`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getOrderItemsMonthlySummaries = async () => {
    const response = await fetch(`${URL}/monthlySummaries`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};