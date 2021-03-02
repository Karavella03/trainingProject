import { subscribe } from '../../api/group/subscribe.js'
import { getUser } from '../../api/getUser.js'
import { subscribersList } from './subscribersList.js'

export const subscribeButton = (group, user) => {
    const button = document.createElement('button')
    button.classList = 'w-100 btn btn-lg btn-primary mt-3'
    button.textContent = user.groups.includes(group._id) ?
        'Отписаться' : 'Подписаться'
    button.onclick = () => { sub(group, user) }
    return button
}

async function sub(group, user) {
    const subscribersUl = document.querySelector('#subscribers-ul')
    const subsColumn = document.querySelector('#subs-column')
    const g = await subscribe(group._id)
    const u = await getUser(user._id)
    subsColumn.replaceChild(subscribersList(g, u), subscribersUl)
}