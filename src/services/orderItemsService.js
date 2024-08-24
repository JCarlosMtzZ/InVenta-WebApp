const URL = 'http://localhost:3001/orderItems';

export const getOrderItemsSummary = async (startDate, endDate) => {
    const response = await fetch(`${URL}/summary?startdate=${startDate}&enddate=${endDate}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getOrderItemsMonthlySummaries = async (startDate, endDate) => {
    const response = await fetch(`${URL}/monthlySummaries?startdate=${startDate}&enddate=${endDate}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};