import { changePassword } from '../../api/changePassword.js'

const form = document.createElement('form')
form.classList = 'mb-3'
const message = document.querySelector('#message-pharagraph')

const elements = {
    password: document.createElement('input'),
    newPasswordOne: document.createElement('input'),
    newPasswordTwo: document.createElement('input'),
    submit: document.createElement('button')
}
//Создание элементов формы смены пароля: Текущий пароль, два раза новый пароль
export const changePasswordForm = (user) => {
    for (let key in elements) {
        if (key !== 'submit') {
            elements[key].type = 'password'
            elements[key].classList = 'form-control mb-2'
            elements[key].setAttribute('required', '')
        } else {
            elements[key].classList = 'w-100 btn btn-lg btn-primary'
            elements[key].type = 'submit'
            elements[key].textContent = 'Сохранить'
        }
        form.insertAdjacentElement('beforeend', elements[key])
    }
    elements.password.placeholder = 'Старый пароль'
    elements.newPasswordOne.placeholder = 'Новый пароль'
    elements.newPasswordTwo.placeholder = 'Повторите новый пароль'
    return form
}

//Отправка закпроса на смену пароля, если новый пароль введён два раза одинаково
form.onsubmit = async (e) => {
    e.preventDefault()
    if(elements.newPasswordOne.value === elements.newPasswordTwo.value) {
        const result = await changePassword(elements.password.value, elements.newPasswordOne.value)
        if(result.errorMessage) {
            message.textContent = result.errorMessage
        } else {
            message.textContent = 'Пароль успешно изменён'
        }
        form.reset()
    } else {
        message.textContent= 'Пароли не совпадают'
    }
    return false
}
