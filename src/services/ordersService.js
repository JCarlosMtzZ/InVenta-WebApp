const URL = 'http://localhost:3001/orders';

export const getOrdersGroupedByMonth = async () => {
    const response = await fetch(`${URL}/grouped/month`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};