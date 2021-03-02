export const createGroup = async (values) => {
    const responce = await fetch('/api/group', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            name: values.name,
            description: values.description
        })
    })
    const result = await responce.json()
    return result
}