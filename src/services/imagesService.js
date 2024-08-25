const URL = 'http://localhost:3001/images'

export const deleteFromDB = async (id) => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};

export const uploadImage = async (url, productId) => {
    const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          url: url,
          productId: productId
        })
    });
    if (!response.ok)
        throw new Error(await response.text());
    return response.json();
};