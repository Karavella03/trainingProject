export const logout = async () => {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
    return response
}