const URL = 'http://localhost:3001/files'

export const deleteFromBucket = async (name) => {
    const response = await fetch(`${URL}/${name}`, {
        method: 'DELETE'
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};