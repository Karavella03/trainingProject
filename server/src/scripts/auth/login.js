const form = document.forms.formSignin

form.onsubmit = async (e) => {
    e.preventDefault()
    const responce = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            login: form.login.value,
            password: form.password.value
        })
    })
    const result = await responce.json()
    if(responce.ok) {
        localStorage.setItem('token', result.token)
        location.href = '/'
    } else {
        alert(result.message)
        form.reset()
    }
    return false
}