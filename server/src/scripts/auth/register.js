const form = document.forms.formSignup

form.onsubmit = async (e) => {
    e.preventDefault()
    const responce = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            login: form.login.value,
            password: form.password.value,
            name: form.name.value,
            surname: form.surname.value,
            description: form.description.value
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