import { getUser } from '../api/user/getUser.js'
import { userSettings } from './elements/userSettings.js'

(async () => {
    const user = await getUser()
    document.querySelector('#user-settings-container').insertAdjacentElement('afterbegin', userSettings(user))
})()