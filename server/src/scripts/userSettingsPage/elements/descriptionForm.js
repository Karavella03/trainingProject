const form = document.createElement('form')
form.classList = 'mb-3'
const elements = {
    name: document.createElement('input'),
    surname: document.createElement('input'),
    description: document.createElement('input'),
    submit: document.createElement('button')
}

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