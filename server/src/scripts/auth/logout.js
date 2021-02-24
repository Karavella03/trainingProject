const logout = document.querySelector('#Button-Logout')

logout.onclick = async () => {
    const responce = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
    })
    localStorage.setItem('token', '')
    location.href = '/login'
}