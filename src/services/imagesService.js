const URL = 'http://localhost:3001/images'

export const deleteFromDB = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};