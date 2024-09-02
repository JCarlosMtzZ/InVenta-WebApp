import { apiURL } from "./util";

const URL = apiURL + 'admins';

export const signup = async (adminData) => {
    const response = await fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(adminData)
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const login = async (adminData) => {
    const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(adminData)
      })
    return response.status;
};

export const logout = async () => {
    const response = await fetch(`${URL}/logout`, {
        credentials: 'include',
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const checkAdmin = async () => {
    const response = await fetch(`${URL}/check`, {
        credentials: 'include'
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAdminById = async (id) => {
    const response = await fetch(`${URL}/${id}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAdminsSummaries = async (startDate, endDate) => {
    const response = await fetch(`${URL}/summaries?startdate=${startDate}&enddate=${endDate}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAdminsMonthlySummaries = async (startDate, endDate) => {
    const response = await fetch(`${URL}/monthlySummaries?startdate=${startDate}&enddate=${endDate}`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};