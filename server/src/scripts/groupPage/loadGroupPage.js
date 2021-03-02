import { getGroup } from '../api/group/getGroup.js'
import { getUser } from '../api/user/getUser.js'
import { subscribersList } from './elements/subscribersList.js'
import { membersList } from './elements/membersList.js'
import { groupDescription } from './elements/groupDescription.js'

(async () => {
    const id = new URL(location).searchParams.get('id')
    const group = await getGroup(id)
    const user = await getUser()
    const subsList = subscribersList(group, user)
    document.querySelector('#subscribers-p').insertAdjacentElement('afterend', subsList)
    document.querySelector('#members-p').insertAdjacentElement('afterend', membersList(group))
    document.querySelector('#group-container').insertAdjacentElement('beforeend', groupDescription(group, user))
})()
