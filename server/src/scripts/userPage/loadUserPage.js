import { getUser } from '../api/user/getUser.js'
import { groupsList } from './elements/groupsList.js'
import { userDescription } from './elements/userDescription.js'

(async () => {
    const id = new URL(location).searchParams.get('id')
    const user = await getUser(id)
    document.querySelector('#groups-p').insertAdjacentElement('afterend', groupsList(user))
    document.querySelector('#user-container').insertAdjacentElement('beforeend', userDescription(user))
})()

