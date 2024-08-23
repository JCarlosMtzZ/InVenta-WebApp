const URL = 'http://localhost:3001/admins';

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

export const getAdminsSummaries = async () => {
    const response = await fetch(`${URL}/summaries`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const getAdminsMonthlySummaries = async () => {
    const response = await fetch(`${URL}/monthlySummaries`);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};