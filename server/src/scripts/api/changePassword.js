export const changePassword = async (password, newPassword) => {
    const response = await fetch('/api/user/changepassword', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            password,
            newPassword
        })
    })
    const result = await response.json()
    return result
}