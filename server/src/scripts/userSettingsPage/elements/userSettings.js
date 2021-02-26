import { descriptionForm } from './descriptionForm.js'
import { changePasswordForm } from './changePasswordForm.js'

const container = document.createElement('div')
container.classList = 'mw-25'

export const userSettings = (user) => {
    container.insertAdjacentElement('beforeend', descriptionForm(user))
    container.insertAdjacentElement('beforeend', changePasswordForm(user))
    return container
}