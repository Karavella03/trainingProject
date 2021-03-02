import { createGroup } from '../../api/createGroup.js'

const message = document.querySelector('#message-pharagraph')
const form = document.createElement('form')

const elements = {
    name: document.createElement('input'),
    description: document.createElement('input'),
    submit: document.createElement('button')
}

export const createGroupForm = () => {
    for (let key in elements) {
        if (key !== 'submit') {
            elements[key].type = 'text'
            elements[key].classList = 'form-control mb-2'
        } else {
            elements[key].classList = 'w-100 btn btn-lg btn-primary'
            elements[key].type = 'submit'
            elements[key].textContent = 'Создать'
        }
        form.insertAdjacentElement('beforeend', elements[key])
    }
    elements.name.setAttribute('required', '')
    elements.name.placeholder = 'Название'
    elements.description.placeholder = 'Описание'
    return form
}

form.onsubmit = async (e) => {
    e.preventDefault()
    const result = await createGroup({
        name: elements.name.value,
        description: elements.description.value
    })
    if(result.errorMessage) {
        message.textContent = result.errorMessage
    } else {
        location.href = `/group?id=${result._id}`
    }
    return false
}