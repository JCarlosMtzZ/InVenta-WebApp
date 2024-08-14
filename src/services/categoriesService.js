const URL = 'http://localhost:3001/categories';

export const getAllCategories = async () => {
    const response = await fetch(URL);
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};