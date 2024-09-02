import { getFinalPrice } from "../utilities/discounts";
import { apiURL } from "./util";

const URL = apiURL + 'orderItems';

export const addOrderItem = async (orderItem, orderId) => {
    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          quantity: orderItem.quantity,
          orderId: orderId,
          productId: orderItem.id,
          unitPrice: orderItem.unitPrice,
          netUnitPrice: getFinalPrice(orderItem).finalPrice
        })
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

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