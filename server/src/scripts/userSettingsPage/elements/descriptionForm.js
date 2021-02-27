const message = document.querySelector('#message-pharagraph')
const form = document.createElement('form')
form.classList = 'mb-3'
const elements = {
    name: document.createElement('input'),
    surname: document.createElement('input'),
    description: document.createElement('input'),
    submit: document.createElement('button')
}

//Создание формы изменения описания пользователя: имя, фамилия, описание 
export const descriptionForm = (user) => {
    for (let key in elements) {
        if (key !== 'submit') {
            elements[key].type = 'text'
            elements[key].classList = 'form-control mb-2'
            elements[key].value = user[key]
            if (key !== 'description') {
                elements[key].setAttribute('required', '')
            }
        } else {
            elements[key].classList = 'w-100 btn btn-lg btn-primary'
            elements[key].type = 'submit'
            elements[key].textContent = 'Сохранить'
        }
        form.insertAdjacentElement('beforeend', elements[key])
    }
    elements.name.placeholder = 'Имя'
    elements.surname.placeholder = 'Фамилия'
    elements.description.placeholder = 'О себе'
    return form
}

//Отправка запроса на изменение описания пользователя
form.onsubmit = async (e) => {
    e.preventDefault()
    const responce = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            name: elements.name.value,
            surname: elements.surname.value,
            description: elements.description.value
        })
    })
    const result = await responce.json()
    if(!responce.ok) {
        message.textContent = result.errorMessage
    } else {
        message.textContent = 'Изменения сохранены'
    }
    return false
}