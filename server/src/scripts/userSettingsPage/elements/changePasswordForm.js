const form = document.createElement('form')

const elements = {
    password: document.createElement('input'),
    newPasswordOne: document.createElement('input'),
    newPasswordTwo: document.createElement('input'),
    submit: document.createElement('button')
}

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