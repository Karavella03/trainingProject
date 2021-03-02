export const changeUserDescription = async (values) => {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            name: values.name,
            surname: values.surname,
            description: values.description
        })
    })
    const result = await response.json()
    return result
}