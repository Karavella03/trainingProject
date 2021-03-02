import { getUser } from '../../api/user/getUser.js'
import { subscribeButton } from './subscribeButton.js'

let counter = 0

function drawSubscribers(group, subscribersUl) {

    subscribersUl.id = 'subscribers-ul'
    subscribersUl.classList = 'list-unstyled ms-3 h5'
    const p = document.createElement('p')
    p.textContent = `Количество: ${group.subscribers.length}`
    subscribersUl.insertAdjacentElement('beforeend', p)

    for (let i = counter * 6; i < Math.min(group.subscribers.length, 6 * (counter + 1)); i++) {
        const userId = group.subscribers[i]
        drawSubscriber(userId, p)
    }
    counter++
    // group.subscribers.forEach(userId => {
    //     drawSubscriber(userId, p)
    // });
}

async function drawSubscriber(userId, p) {
    const li = document.createElement('li')
    li.classList = 'mb-1'
    const a = document.createElement('a')
    const user = await getUser(userId)
    a.textContent = `${user.name} ${user.surname}`
    a.href = `/user?id=${user._id}`
    a.style = 'text-decoration: none; color: black;'
    li.appendChild(a)
    p.insertAdjacentElement('afterend', li)
}

export const subscribersList = (group, user) => {
    counter = 0
    const subscribersUl = document.createElement('ul')
    drawSubscribers(group, subscribersUl)
    subscribersUl.insertAdjacentElement('beforeend', subscribeButton(group, user))
    return (subscribersUl)
}