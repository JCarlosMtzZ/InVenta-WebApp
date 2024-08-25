const URL = 'http://localhost:3001/files'

export const deleteFromBucket = async (name) => {
    const response = await fetch(`${URL}/${name}`, {
        method: 'DELETE'
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const uploadToBucket = async (files) => {
    const response = await fetch(`${URL}`, {
        method: 'POST',
        body: files
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};